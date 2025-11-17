import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { ContactoEntrega } from 'src/contacto-entrega/entities/contacto-entrega.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { FindPedidosDto } from './dto/find-pedidos.dto';
import { Pago } from 'src/pago/entities/pago.entity';
import { PedidoCanal, PedidoEstado, PagoEstado, EstadoActivo } from 'src/common/enums';
import { PedidoHistorialService } from 'src/pedido-historial/pedido-historial.service';
import { FolioService } from 'src/folio/folio.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Direccion)
    private readonly direccionRepository: Repository<Direccion>,
    @InjectRepository(ContactoEntrega)
    private readonly contactoEntregaRepository: Repository<ContactoEntrega>,
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    private readonly pedidoHistorialService: PedidoHistorialService,
    private readonly folioService: FolioService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      const {
        idEmpleado,
        idCliente,
        idDireccion,
        idContactoEntrega,
        idPago,
        canal = PedidoCanal.WEB, // Por defecto es 'web' si no se especifica
        ...pedido
      } = createPedidoDto;

      // Validar canal
      const canalNormalizado = canal || PedidoCanal.WEB;

      let pago = null;
      let estadoInicial = PedidoEstado.PENDIENTE;

      // FLUJO CANAL WEB: Pago es obligatorio y debe estar completado
      if (canalNormalizado === PedidoCanal.WEB) {
        if (!idPago) {
          throw new BadRequestException(
            'El ID del pago es requerido para pedidos del canal web. El pago debe estar completado antes de crear el pedido.',
          );
        }

        pago = await this.pagoRepository.findOne({
          where: { idPago: idPago },
          relations: ['metodoPago'],
        });

        if (!pago) {
          throw new NotFoundException(
            `El pago con id ${idPago} no fue encontrado`,
          );
        }

        // Validar que el método de pago sea compatible con el canal WEB
        if (pago.metodoPago) {
          const canalesDisponibles =
            pago.metodoPago.canalesDisponibles || [
              PedidoCanal.WEB,
              PedidoCanal.INTERNO,
            ];

          if (!canalesDisponibles.includes(PedidoCanal.WEB)) {
            throw new BadRequestException(
              `El método de pago "${pago.metodoPago.descripcion}" no está disponible para pedidos del canal web. Solo está disponible en: ${canalesDisponibles.join(', ')}`,
            );
          }
        }

        // Validar que el pago esté completado (PAGADO)
        if (pago.estado !== PagoEstado.PAGADO) {
          throw new BadRequestException(
            `El pago con id ${idPago} no está completado. Estado actual: ${pago.estado}. En el canal web, el pedido solo puede crearse con un pago completado (${PagoEstado.PAGADO}).`,
          );
        }

        // Validar que el monto del pago coincida con el total del pedido
        // Nota: El totalPedido se calculará automáticamente cuando se agreguen las líneas de detalle
        // Por ahora, validamos que el pago tenga un monto válido
        const montoPago = Number(pago.monto || 0);

        if (montoPago <= 0) {
          throw new BadRequestException(
            `El monto del pago debe ser mayor a 0. Monto actual: ${montoPago}.`,
          );
        }

        // Validar que el pago no esté ya asociado a otro pedido
        if (pago.idPedido !== null && pago.idPedido !== undefined) {
          throw new BadRequestException(
            `El pago con id ${idPago} ya está asociado al pedido ${pago.idPedido}.`,
          );
        }

        estadoInicial = PedidoEstado.PROCESANDO; // En canal web, el pedido se crea ya pagado y pasa a procesando
      }

      // FLUJO CANAL INTERNO: Pago es opcional
      // Si se proporciona idPago, validar que existe (pero puede estar pendiente)
      if (canalNormalizado === PedidoCanal.INTERNO && idPago) {
        pago = await this.pagoRepository.findOne({
          where: { idPago: idPago },
        });

        if (!pago) {
          throw new NotFoundException(
            `El pago con id ${idPago} no fue encontrado`,
          );
        }

        // Si el pago está completado, el pedido se crea como procesando
        if (pago.estado === PagoEstado.PAGADO) {
          estadoInicial = PedidoEstado.PROCESANDO;
        } else {
          estadoInicial = PedidoEstado.PENDIENTE;
        }

        // Validar que el pago no esté ya asociado a otro pedido
        if (pago.idPedido !== null && pago.idPedido !== undefined) {
          throw new BadRequestException(
            `El pago con id ${idPago} ya está asociado al pedido ${pago.idPedido}.`,
          );
        }
      }

      const empleado = await findEntityOrFail(
        this.empleadoRepository,
        { idEmpleado: idEmpleado },
        `El empleado no fue encontrado o no existe`,
      );

      const cliente = await findEntityOrFail(
        this.clienteRepository,
        { idCliente: idCliente },
        `El cliente no fue encontrado o no existe`,
      );

      const direccion = await findEntityOrFail(
        this.direccionRepository,
        { idDireccion: idDireccion },
        `La dirección no fue encontrada o no existe`,
      );

      const contactoEntrega = await findEntityOrFail(
        this.contactoEntregaRepository,
        { idContactoEntrega: idContactoEntrega },
        `El contacto de entrega no fue encontrado o no existe`,
      );

      // Generar número de folio para el pedido
      let numeroPedido: string | undefined;
      let idFolio: number | undefined;
      try {
        // Buscar el folio activo para PEDIDO
        const folioPedido = await this.folioService.buscarFolioPorDocumento('PEDIDO');
        if (folioPedido) {
          numeroPedido = await this.folioService.obtenerSiguienteFolio('PEDIDO');
          idFolio = folioPedido.idFolio;
        }
      } catch (error) {
        // Si no existe el folio, continuar sin número de pedido
        // No lanzar error para no bloquear la creación del pedido
      }

      const newPedido = this.pedidoRepository.create({
        ...pedido,
        estado: estadoInicial,
        canal: canalNormalizado,
        idPago: pago?.idPago, // Asociar el pago si existe
        totalProductos: 0, // Se calculará automáticamente cuando se agreguen las líneas de detalle
        totalPedido: 0, // Se calculará automáticamente cuando se agreguen las líneas de detalle
        numeroPedido,
        idFolio,
        empleado,
        cliente,
        direccion,
        contactoEntrega,
      });

      await this.pedidoRepository.save(newPedido);

      // Si hay un pago, asociarlo al pedido
      if (pago) {
        pago.idPedido = newPedido.idPedido;
        await this.pagoRepository.save(pago);
      }

      return await this.pedidoRepository.findOne({
        where: { idPedido: newPedido.idPedido },
        relations: ['empleado', 'cliente', 'direccion', 'contactoEntrega', 'pago'],
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(filters: FindPedidosDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.pedidoRepository
      .createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.empleado', 'empleado')
      .leftJoinAndSelect('pedido.cliente', 'cliente')
      .leftJoinAndSelect('pedido.direccion', 'direccion')
      .leftJoinAndSelect('pedido.contactoEntrega', 'contactoEntrega');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        `(
          pedido.direccionTxt ILIKE :search OR
          CAST(pedido.idPedido AS TEXT) ILIKE :search OR
          cliente.primerNombre ILIKE :search OR
          cliente.primerApellido ILIKE :search OR
          empleado.primerNombre ILIKE :search OR
          empleado.primerApellido ILIKE :search OR
          contactoEntrega.nombre ILIKE :search OR
          contactoEntrega.apellido ILIKE :search OR
          contactoEntrega.telefono ILIKE :search
        )`,
        { search },
      );
    }

    qb.orderBy('pedido.fechaCreacion', 'DESC').addOrderBy(
      'pedido.idPedido',
      'DESC',
    );

    return qb.getMany();
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { idPedido: id },
      relations: ['empleado', 'cliente', 'direccion', 'contactoEntrega'],
    });

    if (!pedido) {
      throw new NotFoundException(`El pedido con id ${id} no fue encontrado`);
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    try {
      const {
        idEmpleado,
        idCliente,
        idDireccion,
        idContactoEntrega,
        ...toUpdate
      } = updatePedidoDto;

      const empleado = await findEntityOrFail(
        this.empleadoRepository,
        { idEmpleado: idEmpleado },
        `El empleado no fue encontrado o no existe`,
      );

      const cliente = await findEntityOrFail(
        this.clienteRepository,
        { idCliente: idCliente },
        `El cliente no fue encontrado o no existe`,
      );

      const direccion = await findEntityOrFail(
        this.direccionRepository,
        { idDireccion: idDireccion },
        `La dirección no fue encontrada o no existe`,
      );

      const contactoEntrega = await findEntityOrFail(
        this.contactoEntregaRepository,
        { idContactoEntrega: idContactoEntrega },
        `El contacto de entrega no fue encontrado o no existe`,
      );

      const pedido = await this.pedidoRepository.preload({
        idPedido: id,
        ...toUpdate,
        empleado,
        cliente,
        direccion,
        contactoEntrega,
      });

      if (!pedido) {
        throw new NotFoundException(`El pedido con id ${id} no fue encontrado`);
      }

      return this.pedidoRepository.save(pedido);
    } catch (error) {
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido!);
  }

  /**
   * Asocia un pago a un pedido existente (útil para canal interno)
   * Permite que un empleado cree el pedido primero y luego procese el pago
   */
  async asociarPago(idPedido: number, idPago: number) {
    const pedido = await this.findOne(idPedido);
    const pago = await this.pagoRepository.findOne({
      where: { idPago: idPago },
      relations: ['metodoPago'],
    });

    if (!pago) {
      throw new NotFoundException(`El pago con id ${idPago} no fue encontrado`);
    }

    // Validar que el método de pago sea compatible con el canal del pedido
    if (pago.metodoPago) {
      const canalPedido = pedido.canal || PedidoCanal.WEB;
      const canalesDisponibles =
        pago.metodoPago.canalesDisponibles || [
          PedidoCanal.WEB,
          PedidoCanal.INTERNO,
        ];

      if (!canalesDisponibles.includes(canalPedido)) {
        throw new BadRequestException(
          `El método de pago "${pago.metodoPago.descripcion}" no está disponible para pedidos del canal "${canalPedido}". Canales disponibles: ${canalesDisponibles.join(', ')}`,
        );
      }
    }

    // Validar que el pago no esté ya asociado a otro pedido
    if (pago.idPedido !== null && pago.idPedido !== undefined) {
      throw new BadRequestException(
        `El pago con id ${idPago} ya está asociado al pedido ${pago.idPedido}.`,
      );
    }

    // Validar que el pedido no tenga ya un pago asociado
    if (pedido.idPago !== null && pedido.idPago !== undefined) {
      throw new BadRequestException(
        `El pedido ${idPedido} ya tiene un pago asociado (id: ${pedido.idPago}).`,
      );
    }

    // Validar que el monto del pago coincida con el total del pedido
    const totalPedido = Number(pedido.totalPedido || 0);
    const montoPago = Number(pago.monto || 0);

    if (Math.abs(totalPedido - montoPago) > 0.01) {
      throw new BadRequestException(
        `El monto del pago (${montoPago}) no coincide con el total del pedido (${totalPedido}).`,
      );
    }

    // Asociar el pago al pedido
    pedido.idPago = pago.idPago;
    pago.idPedido = pedido.idPedido;

    // Si el pago está completado, actualizar el estado del pedido
    if (pago.estado === PagoEstado.PAGADO) {
      pedido.estado = PedidoEstado.PROCESANDO;
    }

    await this.pedidoRepository.save(pedido);
    await this.pagoRepository.save(pago);

    return await this.findOne(idPedido);
  }

  /**
   * Actualiza el estado de un pedido y registra el cambio en el historial
   */
  async updateEstado(
    idPedido: number,
    nuevoEstado: PedidoEstado,
    idEmpleado: number,
    nota?: string,
  ) {
    const pedido = await this.findOne(idPedido);
    const estadoAnterior = pedido.estado;

    // Validar que el estado nuevo sea diferente al actual
    if (estadoAnterior === nuevoEstado) {
      throw new BadRequestException(
        `El pedido ya está en el estado "${nuevoEstado}". No se puede cambiar al mismo estado.`,
      );
    }

    // Actualizar el estado del pedido
    pedido.estado = nuevoEstado;
    await this.pedidoRepository.save(pedido);

    // Registrar el cambio en el historial
    await this.pedidoHistorialService.create({
      idPedido,
      idEmpleado,
      estadoAnterior,
      estadoNuevo: nuevoEstado,
      nota,
    });

    return await this.findOne(idPedido);
  }

  // async findByCliente(idCliente: number) {}

  // async findByEmpleado(idEmpleado: number) {}

  // async findByDateRange(fechaInicio: Date, fechaFin: Date) {}
}

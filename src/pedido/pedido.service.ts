import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      const {
        idEmpleado,
        idCliente,
        idDireccion,
        idContactoEntrega,
        ...pedido
      } = createPedidoDto;

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

      const newPedido = this.pedidoRepository.create({
        ...pedido,
        empleado,
        cliente,
        direccion,
        contactoEntrega,
      });

      await this.pedidoRepository.save(newPedido);

      return await this.pedidoRepository.findOne({
        where: { idPedido: newPedido.idPedido },
        relations: ['empleado', 'cliente', 'direccion', 'contactoEntrega'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
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

  // async findByCliente(idCliente: number) {}

  // async findByEmpleado(idEmpleado: number) {}

  // async findByDateRange(fechaInicio: Date, fechaFin: Date) {}
}

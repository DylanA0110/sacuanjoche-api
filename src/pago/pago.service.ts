import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { MetodoPago } from 'src/metodo-pago/entities/metodo-pago.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { FindPagosDto } from './dto/find-pagos.dto';
import { PedidoCanal, MetodoPagoEstado, PagoEstado } from 'src/common/enums';
import { PayPalService } from './paypal/paypal.service';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(MetodoPago)
    private readonly metodoPagoRepository: Repository<MetodoPago>,
    private readonly paypalService: PayPalService,
  ) {}

  async create(createPagoDto: CreatePagoDto) {
    try {
      const { idMetodoPago, ...pagoData } = createPagoDto;

      const metodoPago = await findEntityOrFail(
        this.metodoPagoRepository,
        { idMetodoPago },
        'El método de pago no fue encontrado o no existe',
      );

      // Validar que el método de pago esté activo
      if (metodoPago.estado !== MetodoPagoEstado.ACTIVO) {
        throw new BadRequestException(
          `El método de pago "${metodoPago.descripcion}" no está activo.`,
        );
      }

      const newPago = this.pagoRepository.create({
        idMetodoPago: metodoPago.idMetodoPago,
        monto: pagoData.monto,
        estado: pagoData.estado || PagoEstado.PENDIENTE,
        referencia: pagoData.referencia,
        gateway: pagoData.gateway,
        idGateway: pagoData.idGateway,
        paymentLinkUrl: pagoData.paymentLinkUrl,
        paymentUrlExt: pagoData.paymentUrlExt,
        rawPayload: pagoData.rawPayload,
      });

      await this.pagoRepository.save(newPago);

      return this.pagoRepository.findOne({
        where: { idPago: newPago.idPago },
        relations: ['metodoPago'],
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(filters: FindPagosDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.pagoRepository
      .createQueryBuilder('pago')
      .leftJoinAndSelect('pago.metodoPago', 'metodoPago');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        `(
          CAST(pago.idPago AS TEXT) ILIKE :search OR
          pago.estado ILIKE :search OR
          pago.referencia ILIKE :search OR
          pago.gateway ILIKE :search OR
          pago.idGateway ILIKE :search OR
          metodoPago.descripcion ILIKE :search
        )`,
        { search },
      );
    }

    qb.orderBy('pago.fechaPago', 'DESC').addOrderBy('pago.idPago', 'DESC');

    return qb.getMany();
  }

  async findOne(id: number) {
    const pago = await this.pagoRepository.findOne({
      where: { idPago: id },
      relations: ['metodoPago'],
    });

    if (!pago) {
      throw new NotFoundException(`El pago con id ${id} no fue encontrado`);
    }

    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto) {
    try {
      const { idMetodoPago, ...toUpdate } = updatePagoDto;

      const metodoPago =
        idMetodoPago !== undefined
          ? await findEntityOrFail(
              this.metodoPagoRepository,
              { idMetodoPago },
              'El método de pago no fue encontrado o no existe',
            )
          : undefined;

      const pago = await this.pagoRepository.preload({
        idPago: id,
        idMetodoPago: metodoPago?.idMetodoPago,
        ...toUpdate,
      });

      if (!pago) {
        throw new NotFoundException(`El pago con id ${id} no fue encontrado`);
      }

      return this.pagoRepository.save(pago);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const pago = await this.findOne(id);
    await this.pagoRepository.remove(pago);
  }

  /**
   * Crea un pago con PayPal
   * IMPORTANTE: Este método crea el pago ANTES de crear el pedido.
   * El pedido se creará después de confirmar el pago (cuando esté en estado PAGADO).
   */
  async createPayPalPayment(createPagoDto: CreatePagoDto) {
    try {
      const { idMetodoPago, monto, ...pagoData } = createPagoDto;

      // Validar método de pago
      const metodoPago = await findEntityOrFail(
        this.metodoPagoRepository,
        { idMetodoPago },
        'El método de pago no fue encontrado o no existe',
      );

      // Validar que el método de pago esté activo
      if (metodoPago.estado !== MetodoPagoEstado.ACTIVO) {
        throw new BadRequestException(
          `El método de pago "${metodoPago.descripcion}" no está activo.`,
        );
      }

      // Validar que el método de pago sea compatible con canal WEB (PayPal es solo online)
      const canalesDisponibles =
        metodoPago.canalesDisponibles || [PedidoCanal.WEB, PedidoCanal.INTERNO];

      if (!canalesDisponibles.includes(PedidoCanal.WEB)) {
        throw new BadRequestException(
          `El método de pago "${metodoPago.descripcion}" no está disponible para pedidos del canal web. PayPal solo funciona para pedidos online.`,
        );
      }

      // Validar monto
      if (!monto || monto <= 0) {
        throw new BadRequestException(
          'El monto del pago debe ser mayor a 0.',
        );
      }

      // Crear el registro de pago en la BD (sin pedido asociado aún)
      const newPago = this.pagoRepository.create({
        ...pagoData,
        idMetodoPago: metodoPago.idMetodoPago,
        monto,
        estado: PagoEstado.PENDIENTE,
        gateway: 'PAYPAL',
      });

      await this.pagoRepository.save(newPago);

      // Crear la orden en PayPal
      const paypalOrder = await this.paypalService.createOrder(
        monto,
        'USD', // o la moneda que uses
        `Pago de pedido (ID Pago: ${newPago.idPago})`,
      );

      // Actualizar el pago con la información de PayPal
      newPago.idGateway = paypalOrder.orderId;
      newPago.paymentLinkUrl = paypalOrder.approvalUrl;
      newPago.rawPayload = JSON.stringify(paypalOrder);

      await this.pagoRepository.save(newPago);

      return {
        ...newPago,
        paypalApprovalUrl: paypalOrder.approvalUrl,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      handleDbException(error);
    }
  }

  /**
   * Confirma un pago de PayPal después de la aprobación
   * IMPORTANTE: Este método cambia el estado del pago a PAGADO.
   * Después de confirmar, se puede crear el pedido asociado a este pago.
   */
  async confirmPayPalPayment(idPago: number, orderId: string) {
    // Validar que orderId no sea undefined, null o vacío
    if (!orderId || typeof orderId !== 'string' || orderId.trim() === '') {
      throw new BadRequestException('El orderId es requerido y no puede estar vacío');
    }

    const pago = await this.pagoRepository.findOne({
      where: { idPago },
      relations: ['metodoPago'],
    });

    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }

    if (pago.estado === PagoEstado.PAGADO) {
      throw new BadRequestException('Este pago ya fue confirmado anteriormente');
    }

    // Validar que el pago no esté ya asociado a un pedido
    const pedidoExistente = await this.pedidoRepository.findOne({
      where: { idPago: idPago },
    });

    if (pedidoExistente) {
      throw new BadRequestException(
        `El pago con id ${idPago} ya está asociado al pedido ${pedidoExistente.idPedido}. No se puede confirmar un pago que ya tiene un pedido asociado.`,
      );
    }

    // Validar que el orderId coincida con el idGateway guardado
    if (pago.idGateway && pago.idGateway !== orderId) {
      throw new BadRequestException(
        `El orderId proporcionado (${orderId}) no coincide con el orderId del pago (${pago.idGateway}).`,
      );
    }

    // Capturar el pago en PayPal
    const capture = await this.paypalService.captureOrder(orderId);

    // Actualizar el estado del pago a PAGADO
    pago.estado = PagoEstado.PAGADO;
    pago.idGateway = capture.captureId || capture.orderId;
    pago.rawPayload = JSON.stringify(capture);
    pago.referencia = `PayPal Order: ${capture.orderId}`;

    await this.pagoRepository.save(pago);

    return this.pagoRepository.findOne({
      where: { idPago },
      relations: ['metodoPago'],
    });
  }

  /**
   * Maneja webhooks de PayPal para notificaciones
   */
  async handlePayPalWebhook(payload: any) {
    // TODO: Implementar validación de webhook y actualización de estado
    // Por ahora, solo logueamos el webhook
    console.log('PayPal webhook received:', payload);
    return { received: true };
  }
}

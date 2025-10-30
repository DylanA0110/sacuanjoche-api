import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { MetodoPago } from 'src/metodo-pago/entities/metodo-pago.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(MetodoPago)
    private readonly metodoPagoRepository: Repository<MetodoPago>,
  ) {}

  async create(createPagoDto: CreatePagoDto) {
    try {
      const { idPedido, idMetodoPago, ...pagoData } = createPagoDto;

      const [pedido, metodoPago] = await Promise.all([
        findEntityOrFail(
          this.pedidoRepository,
          { idPedido },
          'El pedido no fue encontrado o no existe',
        ),
        findEntityOrFail(
          this.metodoPagoRepository,
          { idMetodoPago },
          'El método de pago no fue encontrado o no existe',
        ),
      ]);

      const newPago = this.pagoRepository.create({
        ...pagoData,
        pedido,
        metodoPago,
      });

      await this.pagoRepository.save(newPago);

      return this.pagoRepository.findOne({
        where: { idPago: newPago.idPago },
        relations: ['pedido', 'metodoPago'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.pagoRepository.find({
      take: limit,
      skip: offset,
      relations: ['pedido', 'metodoPago'],
    });
  }

  async findOne(id: number) {
    const pago = await this.pagoRepository.findOne({
      where: { idPago: id },
      relations: ['pedido', 'metodoPago'],
    });

    if (!pago) {
      throw new NotFoundException(`El pago con id ${id} no fue encontrado`);
    }

    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto) {
    try {
      const { idPedido, idMetodoPago, ...toUpdate } = updatePagoDto;

      const pedido =
        idPedido !== undefined
          ? await findEntityOrFail(
              this.pedidoRepository,
              { idPedido },
              'El pedido no fue encontrado o no existe',
            )
          : undefined;

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
        ...toUpdate,
        pedido,
        metodoPago,
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
}

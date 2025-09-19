import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createDetallePedidoDto: CreateDetallePedidoDto) {
    try {
      const { pedidoId, productoId, ...detalleData } = createDetallePedidoDto;

      const pedido = await findEntityOrFail(
        this.pedidoRepository,
        { id: pedidoId },
        'Pedido not found',
      );

      const producto = await findEntityOrFail(
        this.productoRepository,
        { id: productoId },
        'Producto not found',
      );

      const nuevoDetallePedido = this.detallePedidoRepository.create({
        ...detalleData,
        pedido,
        producto,
        pedidoId,
        productoId,
      });

      await this.detallePedidoRepository.save(nuevoDetallePedido);

      return await this.detallePedidoRepository.findOne({
        where: { id: nuevoDetallePedido.id },
        relations: ['pedido', 'producto'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.detallePedidoRepository.find({
      take: limit,
      skip: offset,
      relations: ['pedido', 'producto'],
    });
  }

  async findOne(id: number) {
    const detallePedido = await this.detallePedidoRepository.findOne({
      where: { id },
      relations: ['pedido', 'producto'],
    });

    if (!detallePedido)
      throw new NotFoundException(`DetallePedido with id ${id} not found`);

    return detallePedido;
  }

  async update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto) {
    const { pedidoId, productoId, ...toUpdate } = updateDetallePedidoDto;

    let pedido: Pedido | undefined = undefined;
    let producto: Producto | undefined = undefined;

    if (pedidoId) {
      pedido = await findEntityOrFail(
        this.pedidoRepository,
        { id: pedidoId },
        'Pedido not found',
      );
    }

    if (productoId) {
      producto = await findEntityOrFail(
        this.productoRepository,
        { id: productoId },
        'Producto not found',
      );
    }

    const detallePedido = await this.detallePedidoRepository.preload({
      id,
      ...toUpdate,
      pedido,
      producto,
      pedidoId,
      productoId,
    });

    if (!detallePedido) {
      throw new NotFoundException(`DetallePedido with id ${id} not found`);
    }

    return this.detallePedidoRepository.save(detallePedido);
  }

  async remove(id: number) {
    const detallePedido = await this.findOne(id);
    await this.detallePedidoRepository.remove(detallePedido);
  }
}

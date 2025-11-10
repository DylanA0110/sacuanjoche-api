import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoHistorial } from './entities/pedido-historial.entity';
import { CreatePedidoHistorialDto } from './dto/create-pedido-historial.dto';
import { UpdatePedidoHistorialDto } from './dto/update-pedido-historial.dto';
import { FindPedidosHistorialDto } from './dto/find-pedidos-historial.dto';

@Injectable()
export class PedidoHistorialService {
  constructor(
    @InjectRepository(PedidoHistorial)
    private readonly pedidoHistorialRepository: Repository<PedidoHistorial>,
  ) {}

  async create(createPedidoHistorialDto: CreatePedidoHistorialDto) {}

  async findAll(filters: FindPedidosHistorialDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.pedidoHistorialRepository
      .createQueryBuilder('pedidoHistorial')
      .leftJoinAndSelect('pedidoHistorial.pedido', 'pedido')
      .leftJoinAndSelect('pedidoHistorial.empleado', 'empleado');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        `(
          pedidoHistorial.estado ILIKE :search OR
          pedidoHistorial.nota ILIKE :search OR
          CAST(pedido.idPedido AS TEXT) ILIKE :search OR
          empleado.primerNombre ILIKE :search OR
          empleado.primerApellido ILIKE :search
        )`,
        { search },
      );
    }

    qb.orderBy('pedidoHistorial.fechaCambio', 'DESC').addOrderBy(
      'pedidoHistorial.idPedidoHistorial',
      'DESC',
    );

    return qb.getMany();
  }

  async findOne(id: number) {}

  async update(
    id: number,
    updatePedidoHistorialDto: UpdatePedidoHistorialDto,
  ) {}

  async remove(id: number) {}

  async findByPedido(idPedido: number) {}
}

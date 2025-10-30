import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoHistorial } from './entities/pedido-historial.entity';
import { CreatePedidoHistorialDto } from './dto/create-pedido-historial.dto';
import { UpdatePedidoHistorialDto } from './dto/update-pedido-historial.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class PedidoHistorialService {
  constructor(
    @InjectRepository(PedidoHistorial)
    private readonly pedidoHistorialRepository: Repository<PedidoHistorial>,
  ) {}

  async create(createPedidoHistorialDto: CreatePedidoHistorialDto) {}

  async findAll(paginationDto: PaginationDto) {}

  async findOne(id: number) {}

  async update(
    id: number,
    updatePedidoHistorialDto: UpdatePedidoHistorialDto,
  ) {}

  async remove(id: number) {}

  async findByPedido(idPedido: number) {}
}

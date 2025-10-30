import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoHistorial } from './entities/pedido-historial.entity';
import { CreatePedidoHistorialDto } from './dto/create-pedido-historial.dto';
import { UpdatePedidoHistorialDto } from './dto/update-pedido-historial.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class PedidoHistorialService {
  constructor(@InjectRepository(PedidoHistorial) private readonly pedidoHistorialRepository: Repository<PedidoHistorial>) {}

  async create(createPedidoHistorialDto: CreatePedidoHistorialDto): Promise<PedidoHistorial> {
    const pedidoHistorial = this.pedidoHistorialRepository.create(createPedidoHistorialDto);
    return await this.pedidoHistorialRepository.save(pedidoHistorial);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: PedidoHistorial[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    const [data, total] = await this.pedidoHistorialRepository.findAndCount({ take: limit, skip: offset, relations: ['pedido', 'empleado'] });
    return { data, total };
  }

  async findOne(id: number): Promise<PedidoHistorial> {
    const pedidoHistorial = await this.pedidoHistorialRepository.findOne({ where: { idPedidoHistorial: id }, relations: ['pedido', 'empleado'] });
    if (!pedidoHistorial) throw new NotFoundException(`Pedido historial con ID ${id} no encontrado`);
    return pedidoHistorial;
  }

  async update(id: number, updatePedidoHistorialDto: UpdatePedidoHistorialDto): Promise<PedidoHistorial> {
    const pedidoHistorial = await this.findOne(id);
    Object.assign(pedidoHistorial, updatePedidoHistorialDto);
    return await this.pedidoHistorialRepository.save(pedidoHistorial);
  }

  async remove(id: number): Promise<void> {
    const pedidoHistorial = await this.findOne(id);
    await this.pedidoHistorialRepository.remove(pedidoHistorial);
  }

  async findByPedido(idPedido: number): Promise<PedidoHistorial[]> {
    return await this.pedidoHistorialRepository.find({ where: { idPedido }, relations: ['pedido', 'empleado'], order: { fechaCambio: 'DESC' } });
  }
}




import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
  ) {}

  async create(createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    const detallePedido = this.detallePedidoRepository.create(createDetallePedidoDto);
    return await this.detallePedidoRepository.save(detallePedido);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: DetallePedido[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    const [data, total] = await this.detallePedidoRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['pedido', 'arreglo'],
    });
    return { data, total };
  }

  async findOne(id: number): Promise<DetallePedido> {
    const detallePedido = await this.detallePedidoRepository.findOne({
      where: { idDetallePedido: id },
      relations: ['pedido', 'arreglo'],
    });
    if (!detallePedido) {
      throw new NotFoundException(`Detalle pedido con ID ${id} no encontrado`);
    }
    return detallePedido;
  }

  async update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto): Promise<DetallePedido> {
    const detallePedido = await this.findOne(id);
    Object.assign(detallePedido, updateDetallePedidoDto);
    return await this.detallePedidoRepository.save(detallePedido);
  }

  async remove(id: number): Promise<void> {
    const detallePedido = await this.findOne(id);
    await this.detallePedidoRepository.remove(detallePedido);
  }

  async findByPedido(idPedido: number): Promise<DetallePedido[]> {
    return await this.detallePedidoRepository.find({
      where: { idPedido },
      relations: ['pedido', 'arreglo'],
    });
  }
}




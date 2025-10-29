import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = this.pedidoRepository.create(createPedidoDto);
    return await this.pedidoRepository.save(pedido);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Pedido[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.pedidoRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['empleado', 'cliente', 'direccion', 'contactoEntrega', 'detallesPedido', 'pagos', 'envio', 'factura', 'historial'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { idPedido: id },
      relations: ['empleado', 'cliente', 'direccion', 'contactoEntrega', 'detallesPedido', 'pagos', 'envio', 'factura', 'historial'],
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    
    Object.assign(pedido, updatePedidoDto);
    return await this.pedidoRepository.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }

  async findByCliente(idCliente: number): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      where: { idCliente },
      relations: ['empleado', 'cliente', 'direccion', 'contactoEntrega'],
    });
  }

  async findByEmpleado(idEmpleado: number): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      where: { idEmpleado },
      relations: ['empleado', 'cliente', 'direccion', 'contactoEntrega'],
    });
  }

  async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Pedido[]> {
    return await this.pedidoRepository
      .createQueryBuilder('pedido')
      .where('pedido.fechaCreacion BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin })
      .leftJoinAndSelect('pedido.cliente', 'cliente')
      .leftJoinAndSelect('pedido.empleado', 'empleado')
      .getMany();
  }
}



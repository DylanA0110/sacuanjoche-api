import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
  ) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const pago = this.pagoRepository.create(createPagoDto);
    return await this.pagoRepository.save(pago);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Pago[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.pagoRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['pedido', 'metodoPago'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { idPago: id },
      relations: ['pedido', 'metodoPago'],
    });

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.findOne(id);
    
    Object.assign(pago, updatePagoDto);
    return await this.pagoRepository.save(pago);
  }

  async remove(id: number): Promise<void> {
    const pago = await this.findOne(id);
    await this.pagoRepository.remove(pago);
  }

  async findByEstado(estado: string): Promise<Pago[]> {
    return await this.pagoRepository.find({
      where: { estado },
      relations: ['pedido', 'metodoPago'],
    });
  }

  async findByPedido(idPedido: number): Promise<Pago[]> {
    return await this.pagoRepository.find({
      where: { idPedido },
      relations: ['pedido', 'metodoPago'],
    });
  }
}




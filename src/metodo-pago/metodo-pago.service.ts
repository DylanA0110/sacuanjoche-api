import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPago } from './entities/metodo-pago.entity';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class MetodoPagoService {
  constructor(
    @InjectRepository(MetodoPago)
    private readonly metodoPagoRepository: Repository<MetodoPago>,
  ) {}

  async create(createMetodoPagoDto: CreateMetodoPagoDto): Promise<MetodoPago> {
    const metodoPago = this.metodoPagoRepository.create(createMetodoPagoDto);
    return await this.metodoPagoRepository.save(metodoPago);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: MetodoPago[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.metodoPagoRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['pagos'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<MetodoPago> {
    const metodoPago = await this.metodoPagoRepository.findOne({
      where: { idMetodoPago: id },
      relations: ['pagos'],
    });

    if (!metodoPago) {
      throw new NotFoundException(`Método de pago con ID ${id} no encontrado`);
    }

    return metodoPago;
  }

  async update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto): Promise<MetodoPago> {
    const metodoPago = await this.findOne(id);
    
    Object.assign(metodoPago, updateMetodoPagoDto);
    return await this.metodoPagoRepository.save(metodoPago);
  }

  async remove(id: number): Promise<void> {
    const metodoPago = await this.findOne(id);
    await this.metodoPagoRepository.remove(metodoPago);
  }

  async findActiveMetodosPago(): Promise<MetodoPago[]> {
    return await this.metodoPagoRepository.find({
      where: { activo: true },
    });
  }
}




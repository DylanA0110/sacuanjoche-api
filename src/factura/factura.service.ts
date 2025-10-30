import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
  ) {}

  async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {
    const factura = this.facturaRepository.create(createFacturaDto);
    return await this.facturaRepository.save(factura);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Factura[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.facturaRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['pedido', 'empleado'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Factura> {
    const factura = await this.facturaRepository.findOne({
      where: { idFactura: id },
      relations: ['pedido', 'empleado'],
    });

    if (!factura) {
      throw new NotFoundException(`Factura con ID ${id} no encontrada`);
    }

    return factura;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura> {
    const factura = await this.findOne(id);
    
    Object.assign(factura, updateFacturaDto);
    return await this.facturaRepository.save(factura);
  }

  async remove(id: number): Promise<void> {
    const factura = await this.findOne(id);
    await this.facturaRepository.remove(factura);
  }

  async findByEstado(estado: string): Promise<Factura[]> {
    return await this.facturaRepository.find({
      where: { estado },
      relations: ['pedido', 'empleado'],
    });
  }

  async findByEmpleado(idEmpleado: number): Promise<Factura[]> {
    return await this.facturaRepository.find({
      where: { idEmpleado },
      relations: ['pedido', 'empleado'],
    });
  }
}




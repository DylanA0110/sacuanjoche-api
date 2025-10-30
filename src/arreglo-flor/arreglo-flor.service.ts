import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArregloFlor } from './entities/arreglo-flor.entity';
import { CreateArregloFlorDto } from './dto/create-arreglo-flor.dto';
import { UpdateArregloFlorDto } from './dto/update-arreglo-flor.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ArregloFlorService {
  constructor(
    @InjectRepository(ArregloFlor)
    private readonly arregloFlorRepository: Repository<ArregloFlor>,
  ) {}

  async create(createArregloFlorDto: CreateArregloFlorDto): Promise<ArregloFlor> {
    const arregloFlor = this.arregloFlorRepository.create(createArregloFlorDto);
    return await this.arregloFlorRepository.save(arregloFlor);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: ArregloFlor[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.arregloFlorRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['arreglo', 'flor'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<ArregloFlor> {
    const arregloFlor = await this.arregloFlorRepository.findOne({
      where: { idArregloFlor: id },
      relations: ['arreglo', 'flor'],
    });

    if (!arregloFlor) {
      throw new NotFoundException(`Arreglo flor con ID ${id} no encontrado`);
    }

    return arregloFlor;
  }

  async update(id: number, updateArregloFlorDto: UpdateArregloFlorDto): Promise<ArregloFlor> {
    const arregloFlor = await this.findOne(id);
    
    Object.assign(arregloFlor, updateArregloFlorDto);
    return await this.arregloFlorRepository.save(arregloFlor);
  }

  async remove(id: number): Promise<void> {
    const arregloFlor = await this.findOne(id);
    await this.arregloFlorRepository.remove(arregloFlor);
  }

  async findByArreglo(idArreglo: number): Promise<ArregloFlor[]> {
    return await this.arregloFlorRepository.find({
      where: { idArreglo },
      relations: ['arreglo', 'flor'],
    });
  }

  async findByFlor(idFlor: number): Promise<ArregloFlor[]> {
    return await this.arregloFlorRepository.find({
      where: { idFlor },
      relations: ['arreglo', 'flor'],
    });
  }
}




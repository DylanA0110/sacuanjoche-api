import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormaArreglo } from './entities/forma-arreglo.entity';
import { CreateFormaArregloDto } from './dto/create-forma-arreglo.dto';
import { UpdateFormaArregloDto } from './dto/update-forma-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class FormaArregloService {
  constructor(
    @InjectRepository(FormaArreglo)
    private readonly formaArregloRepository: Repository<FormaArreglo>,
  ) {}

  async create(createFormaArregloDto: CreateFormaArregloDto): Promise<FormaArreglo> {
    const formaArreglo = this.formaArregloRepository.create(createFormaArregloDto);
    return await this.formaArregloRepository.save(formaArreglo);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: FormaArreglo[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.formaArregloRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['arreglos'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<FormaArreglo> {
    const formaArreglo = await this.formaArregloRepository.findOne({
      where: { idFormaArreglo: id },
      relations: ['arreglos'],
    });

    if (!formaArreglo) {
      throw new NotFoundException(`Forma de arreglo con ID ${id} no encontrada`);
    }

    return formaArreglo;
  }

  async update(id: number, updateFormaArregloDto: UpdateFormaArregloDto): Promise<FormaArreglo> {
    const formaArreglo = await this.findOne(id);
    
    Object.assign(formaArreglo, updateFormaArregloDto);
    return await this.formaArregloRepository.save(formaArreglo);
  }

  async remove(id: number): Promise<void> {
    const formaArreglo = await this.findOne(id);
    await this.formaArregloRepository.remove(formaArreglo);
  }
}



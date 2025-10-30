import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flor } from './entities/flor.entity';
import { CreateFlorDto } from './dto/create-flor.dto';
import { UpdateFlorDto } from './dto/update-flor.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class FlorService {
  constructor(
    @InjectRepository(Flor)
    private readonly florRepository: Repository<Flor>,
  ) {}

  async create(createFlorDto: CreateFlorDto): Promise<Flor> {
    const flor = this.florRepository.create(createFlorDto);
    return await this.florRepository.save(flor);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Flor[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.florRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['arreglosFlor'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Flor> {
    const flor = await this.florRepository.findOne({
      where: { idFlor: id },
      relations: ['arreglosFlor'],
    });

    if (!flor) {
      throw new NotFoundException(`Flor con ID ${id} no encontrada`);
    }

    return flor;
  }

  async update(id: number, updateFlorDto: UpdateFlorDto): Promise<Flor> {
    const flor = await this.findOne(id);
    
    Object.assign(flor, updateFlorDto);
    return await this.florRepository.save(flor);
  }

  async remove(id: number): Promise<void> {
    const flor = await this.findOne(id);
    await this.florRepository.remove(flor);
  }

  async findByTipo(tipo: string): Promise<Flor[]> {
    return await this.florRepository.find({
      where: { tipo, activo: true },
    });
  }

  async findByColor(color: string): Promise<Flor[]> {
    return await this.florRepository.find({
      where: { color, activo: true },
    });
  }

  async findActiveFlowers(): Promise<Flor[]> {
    return await this.florRepository.find({
      where: { activo: true },
    });
  }
}




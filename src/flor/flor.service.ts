import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flor } from './entities/flor.entity';
import { CreateFlorDto } from './dto/create-flor.dto';
import { UpdateFlorDto } from './dto/update-flor.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';

@Injectable()
export class FlorService {
  constructor(
    @InjectRepository(Flor)
    private readonly florRepository: Repository<Flor>,
  ) {}

  async create(createFlorDto: CreateFlorDto) {
    try {
      const newFlor = this.florRepository.create({
        ...createFlorDto,
      });

      await this.florRepository.save(newFlor);

      return newFlor;
    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.florRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const flor = await this.florRepository.findOneBy({ idFlor: id });

    if (!flor) {
      throw new NotFoundException(`La flor con id ${id} no fue encontrada`);
    }

    return flor;
  }

  async update(id: number, updateFlorDto: UpdateFlorDto) {
    try {
      const flor = await this.florRepository.preload({
        idFlor: id,
        ...updateFlorDto,
      });

      if (!flor) {
        throw new NotFoundException(`La flor con id ${id} no fue encontrada`);
      }

      return this.florRepository.save(flor);
    } catch (error) {
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const flor = await this.findOne(id);
    await this.florRepository.remove(flor);
  }
}

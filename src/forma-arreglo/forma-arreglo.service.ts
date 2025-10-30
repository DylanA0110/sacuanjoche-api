import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormaArreglo } from './entities/forma-arreglo.entity';
import { CreateFormaArregloDto } from './dto/create-forma-arreglo.dto';
import { UpdateFormaArregloDto } from './dto/update-forma-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';

@Injectable()
export class FormaArregloService {
  constructor(
    @InjectRepository(FormaArreglo)
    private readonly formaArregloRepository: Repository<FormaArreglo>,
  ) {}

  async create(createFormaArregloDto: CreateFormaArregloDto) {
    try {
      const newFormaArreglo = this.formaArregloRepository.create({
        ...createFormaArregloDto,
      });

      await this.formaArregloRepository.save(newFormaArreglo);

      return newFormaArreglo;
    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.formaArregloRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const formaArreglo = await this.formaArregloRepository.findOneBy({
      idFormaArreglo: id,
    });

    if (!formaArreglo) {
      throw new NotFoundException(
        `La forma de arreglo con id ${id} no fue encontrada`,
      );
    }

    return formaArreglo;
  }

  async update(id: number, updateFormaArregloDto: UpdateFormaArregloDto) {
    try {
      const formaArreglo = await this.formaArregloRepository.preload({
        idFormaArreglo: id,
        ...updateFormaArregloDto,
      });

      if (!formaArreglo) {
        throw new NotFoundException(
          `La forma de arreglo con id ${id} no fue encontrada`,
        );
      }

      return this.formaArregloRepository.save(formaArreglo);
    } catch (error) {
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const formaArreglo = await this.findOne(id);
    await this.formaArregloRepository.remove(formaArreglo);
  }
}

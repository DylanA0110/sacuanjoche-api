import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accesorio } from './entities/accesorio.entity';
import { CreateAccesorioDto } from './dto/create-accesorio.dto';
import { UpdateAccesorioDto } from './dto/update-accesorio.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';

@Injectable()
export class AccesorioService {
  constructor(
    @InjectRepository(Accesorio)
    private readonly accesorioRepository: Repository<Accesorio>,
  ) {}

  async create(createAccesorioDto: CreateAccesorioDto) {
    try {
      const newAccesorio = this.accesorioRepository.create({
        ...createAccesorioDto,
      });

      await this.accesorioRepository.save(newAccesorio);

      return newAccesorio;
    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.accesorioRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const accesorio = await this.accesorioRepository.findOneBy({
      idAccesorio: id,
    });

    if (!accesorio) {
      throw new NotFoundException(
        `El accesorio con id ${id} no fue encontrado`,
      );
    }

    return accesorio;
  }

  async update(id: number, updateAccesorioDto: UpdateAccesorioDto) {
    try {
      const accesorio = await this.accesorioRepository.preload({
        idAccesorio: id,
        ...updateAccesorioDto,
      });

      if (!accesorio) {
        throw new NotFoundException(
          `El accesorio con id ${id} no fue encontrado`,
        );
      }

      return this.accesorioRepository.save(accesorio);
    } catch (error) {
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const accesorio = await this.findOne(id);
    await this.accesorioRepository.remove(accesorio);
  }

  // async findByCategoria(categoria: string) {}

  // async findActiveAccesorios() {}
}

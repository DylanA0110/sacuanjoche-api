import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArregloFlor } from './entities/arreglo-flor.entity';
import { CreateArregloFlorDto } from './dto/create-arreglo-flor.dto';
import { UpdateArregloFlorDto } from './dto/update-arreglo-flor.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Arreglo } from 'src/arreglo/entities/arreglo.entity';
import { Flor } from 'src/flor/entities/flor.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class ArregloFlorService {
  constructor(
    @InjectRepository(ArregloFlor)
    private readonly arregloFlorRepository: Repository<ArregloFlor>,
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
    @InjectRepository(Flor)
    private readonly florRepository: Repository<Flor>,
  ) {}

  async create(createArregloFlorDto: CreateArregloFlorDto) {
    try {
      const { idArreglo, idFlor, ...arregloFlorData } = createArregloFlorDto;

      const [arreglo, flor] = await Promise.all([
        findEntityOrFail(
          this.arregloRepository,
          { idArreglo },
          'El arreglo no fue encontrado o no existe',
        ),
        findEntityOrFail(
          this.florRepository,
          { idFlor },
          'La flor no fue encontrada o no existe',
        ),
      ]);

      const newArregloFlor = this.arregloFlorRepository.create({
        ...arregloFlorData,
        arreglo,
        flor,
      });

      await this.arregloFlorRepository.save(newArregloFlor);

      return this.arregloFlorRepository.findOne({
        where: { idArregloFlor: newArregloFlor.idArregloFlor },
        relations: ['arreglo', 'flor'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.arregloFlorRepository.find({
      take: limit,
      skip: offset,
      relations: ['arreglo', 'flor'],
    });
  }

  async findOne(id: number) {
    const arregloFlor = await this.arregloFlorRepository.findOne({
      where: { idArregloFlor: id },
      relations: ['arreglo', 'flor'],
    });

    if (!arregloFlor) {
      throw new NotFoundException(
        `El registro arreglo-flor con id ${id} no fue encontrado`,
      );
    }

    return arregloFlor;
  }

  async update(id: number, updateArregloFlorDto: UpdateArregloFlorDto) {
    try {
      const { idArreglo, idFlor, ...toUpdate } = updateArregloFlorDto;

      const arreglo =
        idArreglo !== undefined
          ? await findEntityOrFail(
              this.arregloRepository,
              { idArreglo },
              'El arreglo no fue encontrado o no existe',
            )
          : undefined;

      const flor =
        idFlor !== undefined
          ? await findEntityOrFail(
              this.florRepository,
              { idFlor },
              'La flor no fue encontrada o no existe',
            )
          : undefined;

      const arregloFlor = await this.arregloFlorRepository.preload({
        idArregloFlor: id,
        ...toUpdate,
        arreglo,
        flor,
      });

      if (!arregloFlor) {
        throw new NotFoundException(
          `El registro arreglo-flor con id ${id} no fue encontrado`,
        );
      }

      return this.arregloFlorRepository.save(arregloFlor);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const arregloFlor = await this.findOne(id);
    await this.arregloFlorRepository.remove(arregloFlor);
  }
}

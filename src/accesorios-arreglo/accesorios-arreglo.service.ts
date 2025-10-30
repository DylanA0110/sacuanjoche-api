import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccesoriosArreglo } from './entities/accesorios-arreglo.entity';
import { CreateAccesoriosArregloDto } from './dto/create-accesorios-arreglo.dto';
import { UpdateAccesoriosArregloDto } from './dto/update-accesorios-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Accesorio } from 'src/accesorio/entities/accesorio.entity';
import { Arreglo } from 'src/arreglo/entities/arreglo.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class AccesoriosArregloService {
  constructor(
    @InjectRepository(AccesoriosArreglo)
    private readonly accesoriosArregloRepository: Repository<AccesoriosArreglo>,
    @InjectRepository(Accesorio)
    private readonly accesorioRepository: Repository<Accesorio>,
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
  ) {}

  async create(createAccesoriosArregloDto: CreateAccesoriosArregloDto) {
    try {
      const { idAccesorio, idArreglo } = createAccesoriosArregloDto;

      const [accesorio, arreglo] = await Promise.all([
        findEntityOrFail(
          this.accesorioRepository,
          { idAccesorio },
          'El accesorio no fue encontrado o no existe',
        ),
        findEntityOrFail(
          this.arregloRepository,
          { idArreglo },
          'El arreglo no fue encontrado o no existe',
        ),
      ]);

      const newAccesorioArreglo = this.accesoriosArregloRepository.create({
        accesorio,
        arreglo,
      });

      await this.accesoriosArregloRepository.save(newAccesorioArreglo);

      return this.accesoriosArregloRepository.findOne({
        where: {
          idAccesorioArreglo: newAccesorioArreglo.idAccesorioArreglo,
        },
        relations: ['accesorio', 'arreglo'],
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

    return this.accesoriosArregloRepository.find({
      take: limit,
      skip: offset,
      relations: ['accesorio', 'arreglo'],
    });
  }

  async findOne(id: number) {
    const accesorioArreglo = await this.accesoriosArregloRepository.findOne({
      where: { idAccesorioArreglo: id },
      relations: ['accesorio', 'arreglo'],
    });

    if (!accesorioArreglo) {
      throw new NotFoundException(
        `El accesorio arreglo con id ${id} no fue encontrado`,
      );
    }

    return accesorioArreglo;
  }

  async update(
    id: number,
    updateAccesoriosArregloDto: UpdateAccesoriosArregloDto,
  ) {
    try {
      const { idAccesorio, idArreglo, ...toUpdate } =
        updateAccesoriosArregloDto;

      const accesorio =
        idAccesorio !== undefined
          ? await findEntityOrFail(
              this.accesorioRepository,
              { idAccesorio },
              'El accesorio no fue encontrado o no existe',
            )
          : undefined;

      const arreglo =
        idArreglo !== undefined
          ? await findEntityOrFail(
              this.arregloRepository,
              { idArreglo },
              'El arreglo no fue encontrado o no existe',
            )
          : undefined;

      const accesorioArreglo = await this.accesoriosArregloRepository.preload({
        idAccesorioArreglo: id,
        ...toUpdate,
        accesorio,
        arreglo,
      });

      if (!accesorioArreglo) {
        throw new NotFoundException(
          `El accesorio arreglo con id ${id} no fue encontrado`,
        );
      }

      return this.accesoriosArregloRepository.save(accesorioArreglo);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const accesorioArreglo = await this.findOne(id);
    await this.accesoriosArregloRepository.remove(accesorioArreglo);
  }
}

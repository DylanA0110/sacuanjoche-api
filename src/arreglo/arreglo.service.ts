import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arreglo } from './entities/arreglo.entity';
import { CreateArregloDto } from './dto/create-arreglo.dto';
import { UpdateArregloDto } from './dto/update-arreglo.dto';
import { FormaArreglo } from 'src/forma-arreglo/entities/forma-arreglo.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { FindArreglosDto } from './dto/find-arreglos.dto';

@Injectable()
export class ArregloService {
  constructor(
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
    @InjectRepository(FormaArreglo)
    private readonly formaArregloRepository: Repository<FormaArreglo>,
  ) {}

  async create(createArregloDto: CreateArregloDto) {
    try {
      const { idFormaArreglo, ...arregloData } = createArregloDto;

      const formaArreglo = await findEntityOrFail(
        this.formaArregloRepository,
        { idFormaArreglo },
        'La forma de arreglo no fue encontrada o no existe',
      );

      const newArreglo = this.arregloRepository.create({
        ...arregloData,
        formaArreglo,
      });

      await this.arregloRepository.save(newArreglo);

      return this.arregloRepository.findOne({
        where: { idArreglo: newArreglo.idArreglo },
        relations: ['formaArreglo', 'media'],
        order: {
          media: {
            orden: 'ASC',
            idArregloMedia: 'ASC',
          },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(filters: FindArreglosDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.arregloRepository
      .createQueryBuilder('arreglo')
      .leftJoinAndSelect('arreglo.formaArreglo', 'formaArreglo')
      .leftJoinAndSelect('arreglo.media', 'media', 'media.activo = true');

    qb.distinct(true);

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        `(arreglo.nombre ILIKE :search OR arreglo.descripcion ILIKE :search OR formaArreglo.descripcion ILIKE :search)`,
        { search },
      );
    }

    qb.orderBy('arreglo.fechaCreacion', 'DESC')
      .addOrderBy('arreglo.idArreglo', 'DESC')
      .addOrderBy('media.orden', 'ASC')
      .addOrderBy('media.idArregloMedia', 'ASC');

    return qb.getMany();
  }

  async findOne(id: number) {
    const arreglo = await this.arregloRepository.findOne({
      where: { idArreglo: id },
      relations: ['formaArreglo', 'media'],
      order: {
        media: {
          orden: 'ASC',
          idArregloMedia: 'ASC',
        },
      },
    });

    if (!arreglo) {
      throw new NotFoundException(`El arreglo con id ${id} no fue encontrado`);
    }

    return arreglo;
  }

  async update(id: number, updateArregloDto: UpdateArregloDto) {
    try {
      const { idFormaArreglo, ...toUpdate } = updateArregloDto;

      const formaArreglo =
        idFormaArreglo !== undefined
          ? await findEntityOrFail(
              this.formaArregloRepository,
              { idFormaArreglo },
              'La forma de arreglo no fue encontrada o no existe',
            )
          : undefined;

      const arreglo = await this.arregloRepository.preload({
        idArreglo: id,
        ...toUpdate,
        formaArreglo,
      });

      if (!arreglo) {
        throw new NotFoundException(
          `El arreglo con id ${id} no fue encontrado`,
        );
      }

      return this.arregloRepository.save(arreglo);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const arreglo = await this.findOne(id);
    await this.arregloRepository.remove(arreglo);
  }
}

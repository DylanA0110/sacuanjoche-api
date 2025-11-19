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
import { FindArreglosPublicDto } from './dto/find-arreglos-public.dto';
import { ArregloFlor } from 'src/arreglo-flor/entities/arreglo-flor.entity';

@Injectable()
export class ArregloService {
  constructor(
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
    @InjectRepository(FormaArreglo)
    private readonly formaArregloRepository: Repository<FormaArreglo>,
    @InjectRepository(ArregloFlor)
    private readonly arregloFlorRepository: Repository<ArregloFlor>,
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
    const arreglo = await this.arregloRepository
      .createQueryBuilder('arreglo')
      .leftJoinAndSelect('arreglo.formaArreglo', 'formaArreglo')
      .leftJoinAndSelect('arreglo.media', 'media', 'media.activo = true')
      .where('arreglo.idArreglo = :id', { id })
      .orderBy('media.orden', 'ASC')
      .addOrderBy('media.idArregloMedia', 'ASC')
      .getOne();

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

  /**
   * Catálogo público con filtros avanzados
   */
  async findPublic(filters: FindArreglosPublicDto) {
    const {
      limit = 10,
      offset = 0,
      q,
      idFormaArreglo,
      precioMin,
      precioMax,
      flores,
      ordenarPor = 'fechaCreacion',
      orden = 'DESC',
    } = filters;

    const qb = this.arregloRepository
      .createQueryBuilder('arreglo')
      .leftJoinAndSelect('arreglo.formaArreglo', 'formaArreglo')
      .leftJoinAndSelect('arreglo.media', 'media', 'media.activo = true')
      .where('arreglo.estado = :estado', { estado: 'activo' });

    qb.distinct(true);

    // Búsqueda por texto
    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        `(arreglo.nombre ILIKE :search OR arreglo.descripcion ILIKE :search OR formaArreglo.descripcion ILIKE :search)`,
        { search },
      );
    }

    // Filtro por forma de arreglo
    if (idFormaArreglo) {
      qb.andWhere('arreglo.idFormaArreglo = :idFormaArreglo', {
        idFormaArreglo,
      });
    }

    // Filtro por precio
    if (precioMin !== undefined) {
      qb.andWhere('arreglo.precioUnitario >= :precioMin', { precioMin });
    }
    if (precioMax !== undefined) {
      qb.andWhere('arreglo.precioUnitario <= :precioMax', { precioMax });
    }

    // Filtro por flores
    if (flores && flores.length > 0) {
      qb.leftJoin('arreglo.arreglosFlor', 'arregloFlor')
        .leftJoin('arregloFlor.flor', 'flor')
        .andWhere('flor.idFlor IN (:...flores)', { flores });
    }

    // Ordenamiento
    if (ordenarPor === 'nombre') {
      qb.orderBy('arreglo.nombre', orden);
    } else if (ordenarPor === 'precio') {
      qb.orderBy('arreglo.precioUnitario', orden);
    } else {
      qb.orderBy('arreglo.fechaCreacion', orden);
    }

    qb.addOrderBy('arreglo.idArreglo', 'DESC')
      .addOrderBy('media.orden', 'ASC')
      .addOrderBy('media.idArregloMedia', 'ASC');

    qb.take(limit).skip(offset);

    return qb.getMany();
  }

  /**
   * Obtener opciones de filtros disponibles para el catálogo
   */
  async getFiltrosDisponibles() {
    try {
      const [formasArreglo, precios, arreglosFlor] = await Promise.all([
        // Formas de arreglo activas
        this.formaArregloRepository.find({
          where: { activo: true },
          select: ['idFormaArreglo', 'descripcion'],
          order: { descripcion: 'ASC' },
        }),

        // Rango de precios
        this.arregloRepository
          .createQueryBuilder('arreglo')
          .select('MIN(arreglo.precioUnitario)', 'min')
          .addSelect('MAX(arreglo.precioUnitario)', 'max')
          .where('arreglo.estado = :estado', { estado: 'activo' })
          .getRawOne(),

        // Flores disponibles en arreglos activos
        this.arregloFlorRepository
          .createQueryBuilder('af')
          .innerJoinAndSelect('af.flor', 'flor')
          .innerJoin('af.arreglo', 'arreglo')
          .where('arreglo.estado = :estado', { estado: 'activo' })
          .andWhere('flor.estado = :florEstado', { florEstado: 'activo' })
          .getMany(),
      ]);

      // Obtener flores únicas y ordenadas
      const floresMap = new Map<number, { id: number; nombre: string; color: string }>();
      arreglosFlor.forEach((af) => {
        if (af.flor && !floresMap.has(af.flor.idFlor)) {
          floresMap.set(af.flor.idFlor, {
            id: af.flor.idFlor,
            nombre: af.flor.nombre,
            color: af.flor.color,
          });
        }
      });
      const flores = Array.from(floresMap.values()).sort((a, b) =>
        a.nombre.localeCompare(b.nombre),
      );

      return {
        formasArreglo: formasArreglo.map((f) => ({
          id: f.idFormaArreglo,
          descripcion: f.descripcion,
        })),
        precios: {
          min: parseFloat(precios?.min || '0'),
          max: parseFloat(precios?.max || '0'),
        },
        flores: flores,
      };
    } catch (error) {
      console.error('Error en getFiltrosDisponibles:', error);
      throw error;
    }
  }
}

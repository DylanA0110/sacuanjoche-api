import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormaArreglo } from './entities/forma-arreglo.entity';
import { CreateFormaArregloDto } from './dto/create-forma-arreglo.dto';
import { UpdateFormaArregloDto } from './dto/update-forma-arreglo.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { FindFormasArregloDto } from './dto/find-formas-arreglo.dto';

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

  async findAll(filters: FindFormasArregloDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.formaArregloRepository.createQueryBuilder('formaArreglo');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere('(formaArreglo.descripcion ILIKE :search)', { search });
    }

    qb.orderBy('formaArreglo.descripcion', 'ASC').addOrderBy(
      'formaArreglo.idFormaArreglo',
      'ASC',
    );

    return qb.getMany();
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

  /**
   * Obtener formas de arreglo activas para catálogo público
   * Solo retorna id y descripción
   */
  async findPublic() {
    const formasArreglo = await this.formaArregloRepository.find({
      where: { activo: true },
      select: ['idFormaArreglo', 'descripcion'],
      order: { descripcion: 'ASC' },
    });

    return formasArreglo;
  }
}

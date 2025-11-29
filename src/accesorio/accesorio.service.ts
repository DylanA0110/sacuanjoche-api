import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accesorio } from './entities/accesorio.entity';
import { CreateAccesorioDto } from './dto/create-accesorio.dto';
import { UpdateAccesorioDto } from './dto/update-accesorio.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { FindAccesoriosDto } from './dto/find-accesorios.dto';
import { ArticuloEstado } from 'src/common/enums';

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

  async findAll(filters: FindAccesoriosDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.accesorioRepository.createQueryBuilder('accesorio');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        '(accesorio.descripcion ILIKE :search OR accesorio.categoria ILIKE :search)',
        { search },
      );
    }

    qb.orderBy('accesorio.descripcion', 'ASC').addOrderBy(
      'accesorio.idAccesorio',
      'ASC',
    );

    return qb.getMany();
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

  /**
   * Obtener accesorios activos para catálogo público
   * Solo retorna id, descripción y categoría
   */
  async findPublic() {
    const accesorios = await this.accesorioRepository.find({
      where: { estado: ArticuloEstado.ACTIVO },
      select: ['idAccesorio', 'descripcion', 'categoria'],
      order: { descripcion: 'ASC' },
    });

    return accesorios;
  }

  // async findByCategoria(categoria: string) {}

  // async findActiveAccesorios() {}
}

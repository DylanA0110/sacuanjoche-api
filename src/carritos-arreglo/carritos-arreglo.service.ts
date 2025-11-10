import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarritosArreglo } from './entities/carritos-arreglo.entity';
import { CreateCarritosArregloDto } from './dto/create-carritos-arreglo.dto';
import { UpdateCarritosArregloDto } from './dto/update-carritos-arreglo.dto';
import { Carrito } from 'src/carrito/entities/carrito.entity';
import { Arreglo } from 'src/arreglo/entities/arreglo.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { FindCarritosArregloDto } from './dto/find-carritos-arreglo.dto';

@Injectable()
export class CarritosArregloService {
  constructor(
    @InjectRepository(CarritosArreglo)
    private readonly carritosArregloRepository: Repository<CarritosArreglo>,
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
  ) {}

  async create(createCarritosArregloDto: CreateCarritosArregloDto) {
    try {
      const { idCarrito, idArreglo, ...lineData } = createCarritosArregloDto;

      const [carrito, arreglo] = await Promise.all([
        findEntityOrFail(
          this.carritoRepository,
          { idCarrito },
          'El carrito no fue encontrado o no existe',
        ),
        findEntityOrFail(
          this.arregloRepository,
          { idArreglo },
          'El arreglo no fue encontrado o no existe',
        ),
      ]);

      const newLine = this.carritosArregloRepository.create({
        ...lineData,
        carrito,
        arreglo,
      });

      await this.carritosArregloRepository.save(newLine);

      return this.carritosArregloRepository.findOne({
        where: { idCarritoArreglo: newLine.idCarritoArreglo },
        relations: ['carrito', 'arreglo'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(filters: FindCarritosArregloDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.carritosArregloRepository
      .createQueryBuilder('carritoArreglo')
      .leftJoinAndSelect('carritoArreglo.carrito', 'carrito')
      .leftJoinAndSelect('carrito.user', 'user')
      .leftJoinAndSelect('carritoArreglo.arreglo', 'arreglo');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        '(arreglo.nombre ILIKE :search OR user.email ILIKE :search)',
        { search },
      );
    }

    qb.orderBy('carritoArreglo.idCarritoArreglo', 'DESC');

    return qb.getMany();
  }

  async findOne(id: number) {
    const line = await this.carritosArregloRepository.findOne({
      where: { idCarritoArreglo: id },
      relations: ['carrito', 'arreglo'],
    });

    if (!line) {
      throw new NotFoundException(
        `El registro carrito-arreglo con id ${id} no fue encontrado`,
      );
    }

    return line;
  }

  async update(id: number, updateCarritosArregloDto: UpdateCarritosArregloDto) {
    try {
      const { idCarrito, idArreglo, ...toUpdate } = updateCarritosArregloDto;

      const carrito =
        idCarrito !== undefined
          ? await findEntityOrFail(
              this.carritoRepository,
              { idCarrito },
              'El carrito no fue encontrado o no existe',
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

      const line = await this.carritosArregloRepository.preload({
        idCarritoArreglo: id,
        ...toUpdate,
        carrito,
        arreglo,
      });

      if (!line) {
        throw new NotFoundException(
          `El registro carrito-arreglo con id ${id} no fue encontrado`,
        );
      }

      return this.carritosArregloRepository.save(line);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const line = await this.findOne(id);
    await this.carritosArregloRepository.remove(line);
  }
}

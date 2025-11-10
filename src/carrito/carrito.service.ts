import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { User } from 'src/auth/entities/user.entity';
import { FindCarritosDto } from './dto/find-carritos.dto';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCarritoDto: CreateCarritoDto) {
    try {
      const { idUser, ...carritoData } = createCarritoDto;

      const user = await findEntityOrFail(
        this.userRepository,
        { id: idUser as unknown as any },
        'El usuario no fue encontrado o no existe',
      );

      const newCarrito = this.carritoRepository.create({
        ...carritoData,
        user,
      });

      await this.carritoRepository.save(newCarrito);

      return this.carritoRepository.findOne({
        where: { idCarrito: newCarrito.idCarrito },
        relations: ['user', 'carritosArreglo'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(filters: FindCarritosDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.carritoRepository
      .createQueryBuilder('carrito')
      .leftJoinAndSelect('carrito.user', 'user')
      .leftJoinAndSelect('carrito.carritosArreglo', 'carritosArreglo');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere('(user.email ILIKE :search)', { search });
    }

    qb.orderBy('carrito.fechaUltAct', 'DESC').addOrderBy(
      'carrito.idCarrito',
      'DESC',
    );

    return qb.getMany();
  }

  async findOne(id: number) {
    const carrito = await this.carritoRepository.findOne({
      where: { idCarrito: id },
      relations: ['user', 'carritosArreglo'],
    });

    if (!carrito) {
      throw new NotFoundException(`El carrito con id ${id} no fue encontrado`);
    }

    return carrito;
  }

  async update(id: number, updateCarritoDto: UpdateCarritoDto) {
    try {
      const { idUser, ...toUpdate } = updateCarritoDto;

      const user =
        idUser !== undefined
          ? await findEntityOrFail(
              this.userRepository,
              { id: idUser as unknown as any },
              'El usuario no fue encontrado o no existe',
            )
          : undefined;

      const carrito = await this.carritoRepository.preload({
        idCarrito: id,
        ...toUpdate,
        user,
      });

      if (!carrito) {
        throw new NotFoundException(
          `El carrito con id ${id} no fue encontrado`,
        );
      }

      return this.carritoRepository.save(carrito);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const carrito = await this.findOne(id);
    await this.carritoRepository.remove(carrito);
  }
}

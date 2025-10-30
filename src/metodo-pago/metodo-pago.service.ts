import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPago } from './entities/metodo-pago.entity';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';

@Injectable()
export class MetodoPagoService {
  constructor(
    @InjectRepository(MetodoPago)
    private readonly metodoPagoRepository: Repository<MetodoPago>,
  ) {}

  async create(createMetodoPagoDto: CreateMetodoPagoDto) {
    try {
      const newMetodoPago = this.metodoPagoRepository.create({
        ...createMetodoPagoDto,
      });

      await this.metodoPagoRepository.save(newMetodoPago);

      return newMetodoPago;
    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.metodoPagoRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const metodoPago = await this.metodoPagoRepository.findOneBy({
      idMetodoPago: id,
    });

    if (!metodoPago) {
      throw new NotFoundException(
        `El método de pago con id ${id} no fue encontrado`,
      );
    }

    return metodoPago;
  }

  async update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto) {
    try {
      const metodoPago = await this.metodoPagoRepository.preload({
        idMetodoPago: id,
        ...updateMetodoPagoDto,
      });

      if (!metodoPago) {
        throw new NotFoundException(
          `El método de pago con id ${id} no fue encontrado`,
        );
      }

      return this.metodoPagoRepository.save(metodoPago);
    } catch (error) {
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const metodoPago = await this.findOne(id);
    await this.metodoPagoRepository.remove(metodoPago);
  }
}

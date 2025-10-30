import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direccion } from './entities/direccion.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';

@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepository: Repository<Direccion>,
  ) {}

  async create(createDireccionDto: CreateDireccionDto) {
    try {
      const { ...direccion } = createDireccionDto;

      const newDireccion = this.direccionRepository.create({ ...direccion });

      await this.direccionRepository.save(newDireccion);

      return { ...newDireccion };
    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const direcciones = await this.direccionRepository.find({
      skip: offset,
      take: limit,
    });

    return direcciones;
  }

  async findOne(id: number) {
    const direccion = await this.direccionRepository.findOneBy({
      idDireccion: id,
    });

    if (!direccion) {
      throw new NotFoundException(`Direccion with ID ${id} not found`);
    }

    return direccion;
  }

  async update(id: number, updateDireccionDto: UpdateDireccionDto) {
    try {
      const { ...toUpdate } = updateDireccionDto;

      const direccion = await this.direccionRepository.preload({
        idDireccion: id,
        ...toUpdate,
      });

      if (!direccion) {
        throw new NotFoundException(`Direccion con id ${id} no encontrada`);
      }

      return this.direccionRepository.save(direccion);
    } catch (error) {
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const direccion = await this.findOne(id);
    await this.direccionRepository.remove(direccion!);
  }
}

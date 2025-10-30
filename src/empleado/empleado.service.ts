import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    try {
      const newEmpleado = this.empleadoRepository.create({
        ...createEmpleadoDto,
      });

      await this.empleadoRepository.save(newEmpleado);

      return newEmpleado;
    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.empleadoRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const empleado = await this.empleadoRepository.findOneBy({
      idEmpleado: id,
    });

    if (!empleado) {
      throw new NotFoundException(`El empleado con id ${id} no fue encontrado`);
    }

    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    try {
      const empleado = await this.empleadoRepository.preload({
        idEmpleado: id,
        ...updateEmpleadoDto,
      });

      if (!empleado) {
        throw new NotFoundException(
          `El empleado con id ${id} no fue encontrado`,
        );
      }

      return this.empleadoRepository.save(empleado);
    } catch (error) {
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const empleado = await this.findOne(id);
    await this.empleadoRepository.remove(empleado);
  }
}

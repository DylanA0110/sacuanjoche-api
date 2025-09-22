import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { Rol } from 'src/rol/entities/rol.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    try {
      const { rol, ...empleado } = createEmpleadoDto;

      const nuevoRol = await findEntityOrFail(
        this.rolRepository,
        { idRol: rol },
        'Rol not found',
      );

      const nuevoEmpleado = this.empleadoRepository.create({
        ...empleado,
        rol: nuevoRol,
      });

      await this.empleadoRepository.save(nuevoEmpleado);

      return await this.empleadoRepository.findOne({
        where: { id: nuevoEmpleado.id },
        relations: ['rol'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const empleados = this.empleadoRepository.find({
      take: limit,
      skip: offset,
      relations: ['rol'],
    });

    return empleados;
  }

  async findOne(id: number) {
    const empleado = await this.empleadoRepository.findOne({
      where: { id: id },
      relations: ['rol'],
    });

    if (!empleado)
      throw new NotFoundException(`Empleado with id ${id} not found`);

    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    const { rol, ...toUpdate } = updateEmpleadoDto;

    const nuevoRol = await findEntityOrFail(
      this.rolRepository,
      { idRol: rol },
      'Rol not found',
    );

    const empleado = await this.empleadoRepository.preload({
      id: id,
      ...toUpdate,
      rol: nuevoRol,
    });

    if (!empleado) {
      console.log(`El empleado con id ${id} no fue encontrado`);
      throw new NotFoundException(`El empleado no fue encontrado`);
    }

    return this.empleadoRepository.save(empleado);
  }

  async remove(id: number) {
    const empleado = await this.findOne(id);
    await this.empleadoRepository.remove(empleado);
  }
}

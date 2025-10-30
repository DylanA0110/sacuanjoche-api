import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const empleado = this.empleadoRepository.create(createEmpleadoDto);
    return await this.empleadoRepository.save(empleado);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Empleado[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.empleadoRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['pedidos', 'envios', 'facturas', 'users', 'pedidosHistorial'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findOne({
      where: { idEmpleado: id },
      relations: ['pedidos', 'envios', 'facturas', 'users', 'pedidosHistorial'],
    });

    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
    const empleado = await this.findOne(id);
    
    Object.assign(empleado, updateEmpleadoDto);
    return await this.empleadoRepository.save(empleado);
  }

  async remove(id: number): Promise<void> {
    const empleado = await this.findOne(id);
    await this.empleadoRepository.remove(empleado);
  }

  async findActiveEmpleados(): Promise<Empleado[]> {
    return await this.empleadoRepository.find({
      where: { activo: true },
    });
  }

  async findBySexo(sexo: string): Promise<Empleado[]> {
    return await this.empleadoRepository.find({
      where: { sexo, activo: true },
    });
  }
}




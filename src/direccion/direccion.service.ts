import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direccion } from './entities/direccion.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class DireccionService {
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepository: Repository<Direccion>,
  ) {}

  async create(createDireccionDto: CreateDireccionDto): Promise<Direccion> {
    const direccion = this.direccionRepository.create(createDireccionDto);
    return await this.direccionRepository.save(direccion);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Direccion[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.direccionRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['clienteDirecciones', 'pedidos'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Direccion> {
    const direccion = await this.direccionRepository.findOne({
      where: { idDireccion: id },
      relations: ['clienteDirecciones', 'pedidos'],
    });

    if (!direccion) {
      throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    }

    return direccion;
  }

  async update(id: number, updateDireccionDto: UpdateDireccionDto): Promise<Direccion> {
    const direccion = await this.findOne(id);
    
    Object.assign(direccion, updateDireccionDto);
    return await this.direccionRepository.save(direccion);
  }

  async remove(id: number): Promise<void> {
    const direccion = await this.findOne(id);
    await this.direccionRepository.remove(direccion);
  }

  async findByCity(city: string): Promise<Direccion[]> {
    return await this.direccionRepository.find({
      where: { city, activo: true },
    });
  }

  async findByPostalCode(postalCode: string): Promise<Direccion[]> {
    return await this.direccionRepository.find({
      where: { postalCode, activo: true },
    });
  }

  async findActiveDirecciones(): Promise<Direccion[]> {
    return await this.direccionRepository.find({
      where: { activo: true },
    });
  }
}




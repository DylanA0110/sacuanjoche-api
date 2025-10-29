import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarritosArreglo } from './entities/carritos-arreglo.entity';
import { CreateCarritosArregloDto } from './dto/create-carritos-arreglo.dto';
import { UpdateCarritosArregloDto } from './dto/update-carritos-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class CarritosArregloService {
  constructor(
    @InjectRepository(CarritosArreglo)
    private readonly carritosArregloRepository: Repository<CarritosArreglo>,
  ) {}

  async create(createCarritosArregloDto: CreateCarritosArregloDto): Promise<CarritosArreglo> {
    const carritosArreglo = this.carritosArregloRepository.create(createCarritosArregloDto);
    return await this.carritosArregloRepository.save(carritosArreglo);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: CarritosArreglo[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.carritosArregloRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['carrito', 'arreglo'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<CarritosArreglo> {
    const carritosArreglo = await this.carritosArregloRepository.findOne({
      where: { idCarritoArreglo: id },
      relations: ['carrito', 'arreglo'],
    });

    if (!carritosArreglo) {
      throw new NotFoundException(`Carrito arreglo con ID ${id} no encontrado`);
    }

    return carritosArreglo;
  }

  async update(id: number, updateCarritosArregloDto: UpdateCarritosArregloDto): Promise<CarritosArreglo> {
    const carritosArreglo = await this.findOne(id);
    
    Object.assign(carritosArreglo, updateCarritosArregloDto);
    return await this.carritosArregloRepository.save(carritosArreglo);
  }

  async remove(id: number): Promise<void> {
    const carritosArreglo = await this.findOne(id);
    await this.carritosArregloRepository.remove(carritosArreglo);
  }

  async findByCarrito(idCarrito: number): Promise<CarritosArreglo[]> {
    return await this.carritosArregloRepository.find({
      where: { idCarrito },
      relations: ['carrito', 'arreglo'],
    });
  }

  async findByArreglo(idArreglo: number): Promise<CarritosArreglo[]> {
    return await this.carritosArregloRepository.find({
      where: { idArreglo },
      relations: ['carrito', 'arreglo'],
    });
  }
}



import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
  ) {}

  async create(createCarritoDto: CreateCarritoDto): Promise<Carrito> {
    const carrito = this.carritoRepository.create(createCarritoDto);
    return await this.carritoRepository.save(carrito);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Carrito[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.carritoRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['user', 'carritosArreglo'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Carrito> {
    const carrito = await this.carritoRepository.findOne({
      where: { idCarrito: id },
      relations: ['user', 'carritosArreglo'],
    });

    if (!carrito) {
      throw new NotFoundException(`Carrito con ID ${id} no encontrado`);
    }

    return carrito;
  }

  async update(id: number, updateCarritoDto: UpdateCarritoDto): Promise<Carrito> {
    const carrito = await this.findOne(id);
    
    Object.assign(carrito, updateCarritoDto);
    return await this.carritoRepository.save(carrito);
  }

  async remove(id: number): Promise<void> {
    const carrito = await this.findOne(id);
    await this.carritoRepository.remove(carrito);
  }

  async findByUser(idUser: number): Promise<Carrito | null> {
    return await this.carritoRepository.findOne({
      where: { idUser, activo: true },
      relations: ['user', 'carritosArreglo'],
    });
  }

  async findActiveCarritos(): Promise<Carrito[]> {
    return await this.carritoRepository.find({
      where: { activo: true },
      relations: ['user'],
    });
  }
}




import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arreglo } from './entities/arreglo.entity';
import { CreateArregloDto } from './dto/create-arreglo.dto';
import { UpdateArregloDto } from './dto/update-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ArregloService {
  constructor(
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
  ) {}

  async create(createArregloDto: CreateArregloDto): Promise<Arreglo> {
    const arreglo = this.arregloRepository.create(createArregloDto);
    return await this.arregloRepository.save(arreglo);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Arreglo[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.arregloRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['formaArreglo', 'arreglosFlor', 'accesoriosArreglo', 'carritosArreglo', 'detallesPedido'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Arreglo> {
    const arreglo = await this.arregloRepository.findOne({
      where: { idArreglo: id },
      relations: ['formaArreglo', 'arreglosFlor', 'accesoriosArreglo', 'carritosArreglo', 'detallesPedido'],
    });

    if (!arreglo) {
      throw new NotFoundException(`Arreglo con ID ${id} no encontrado`);
    }

    return arreglo;
  }

  async update(id: number, updateArregloDto: UpdateArregloDto): Promise<Arreglo> {
    const arreglo = await this.findOne(id);
    
    Object.assign(arreglo, updateArregloDto);
    return await this.arregloRepository.save(arreglo);
  }

  async remove(id: number): Promise<void> {
    const arreglo = await this.findOne(id);
    await this.arregloRepository.remove(arreglo);
  }

  async findByFormaArreglo(idFormaArreglo: number): Promise<Arreglo[]> {
    return await this.arregloRepository.find({
      where: { idFormaArreglo, activo: true },
      relations: ['formaArreglo'],
    });
  }

  async findActiveArreglos(): Promise<Arreglo[]> {
    return await this.arregloRepository.find({
      where: { activo: true },
      relations: ['formaArreglo'],
    });
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Arreglo[]> {
    return await this.arregloRepository
      .createQueryBuilder('arreglo')
      .where('arreglo.precioUnitario BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice })
      .andWhere('arreglo.activo = :activo', { activo: true })
      .leftJoinAndSelect('arreglo.formaArreglo', 'formaArreglo')
      .getMany();
  }
}




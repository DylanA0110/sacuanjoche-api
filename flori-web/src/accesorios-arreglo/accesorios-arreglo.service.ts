import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccesoriosArreglo } from './entities/accesorios-arreglo.entity';
import { CreateAccesoriosArregloDto } from './dto/create-accesorios-arreglo.dto';
import { UpdateAccesoriosArregloDto } from './dto/update-accesorios-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class AccesoriosArregloService {
  constructor(
    @InjectRepository(AccesoriosArreglo)
    private readonly accesoriosArregloRepository: Repository<AccesoriosArreglo>,
  ) {}

  async create(createAccesoriosArregloDto: CreateAccesoriosArregloDto): Promise<AccesoriosArreglo> {
    const accesoriosArreglo = this.accesoriosArregloRepository.create(createAccesoriosArregloDto);
    return await this.accesoriosArregloRepository.save(accesoriosArreglo);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: AccesoriosArreglo[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.accesoriosArregloRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['accesorio', 'arreglo'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<AccesoriosArreglo> {
    const accesoriosArreglo = await this.accesoriosArregloRepository.findOne({
      where: { idAccesorioArreglo: id },
      relations: ['accesorio', 'arreglo'],
    });

    if (!accesoriosArreglo) {
      throw new NotFoundException(`Accesorios arreglo con ID ${id} no encontrado`);
    }

    return accesoriosArreglo;
  }

  async update(id: number, updateAccesoriosArregloDto: UpdateAccesoriosArregloDto): Promise<AccesoriosArreglo> {
    const accesoriosArreglo = await this.findOne(id);
    
    Object.assign(accesoriosArreglo, updateAccesoriosArregloDto);
    return await this.accesoriosArregloRepository.save(accesoriosArreglo);
  }

  async remove(id: number): Promise<void> {
    const accesoriosArreglo = await this.findOne(id);
    await this.accesoriosArregloRepository.remove(accesoriosArreglo);
  }

  async findByAccesorio(idAccesorio: number): Promise<AccesoriosArreglo[]> {
    return await this.accesoriosArregloRepository.find({
      where: { idAccesorio },
      relations: ['accesorio', 'arreglo'],
    });
  }

  async findByArreglo(idArreglo: number): Promise<AccesoriosArreglo[]> {
    return await this.accesoriosArregloRepository.find({
      where: { idArreglo },
      relations: ['accesorio', 'arreglo'],
    });
  }
}



import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accesorio } from './entities/accesorio.entity';
import { CreateAccesorioDto } from './dto/create-accesorio.dto';
import { UpdateAccesorioDto } from './dto/update-accesorio.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class AccesorioService {
  constructor(
    @InjectRepository(Accesorio)
    private readonly accesorioRepository: Repository<Accesorio>,
  ) {}

  async create(createAccesorioDto: CreateAccesorioDto): Promise<Accesorio> {
    const accesorio = this.accesorioRepository.create(createAccesorioDto);
    return await this.accesorioRepository.save(accesorio);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Accesorio[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.accesorioRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['accesoriosArreglo'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Accesorio> {
    const accesorio = await this.accesorioRepository.findOne({
      where: { idAccesorio: id },
      relations: ['accesoriosArreglo'],
    });

    if (!accesorio) {
      throw new NotFoundException(`Accesorio con ID ${id} no encontrado`);
    }

    return accesorio;
  }

  async update(id: number, updateAccesorioDto: UpdateAccesorioDto): Promise<Accesorio> {
    const accesorio = await this.findOne(id);
    
    Object.assign(accesorio, updateAccesorioDto);
    return await this.accesorioRepository.save(accesorio);
  }

  async remove(id: number): Promise<void> {
    const accesorio = await this.findOne(id);
    await this.accesorioRepository.remove(accesorio);
  }

  async findByCategoria(categoria: string): Promise<Accesorio[]> {
    return await this.accesorioRepository.find({
      where: { categoria, activo: true },
    });
  }

  async findActiveAccesorios(): Promise<Accesorio[]> {
    return await this.accesorioRepository.find({
      where: { activo: true },
    });
  }
}



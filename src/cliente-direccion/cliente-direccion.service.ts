import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteDireccion } from './entities/cliente-direccion.entity';
import { CreateClienteDireccionDto } from './dto/create-cliente-direccion.dto';
import { UpdateClienteDireccionDto } from './dto/update-cliente-direccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ClienteDireccionService {
  constructor(
    @InjectRepository(ClienteDireccion)
    private readonly clienteDireccionRepository: Repository<ClienteDireccion>,
  ) {}

  async create(createClienteDireccionDto: CreateClienteDireccionDto): Promise<ClienteDireccion> {
    const clienteDireccion = this.clienteDireccionRepository.create(createClienteDireccionDto);
    return await this.clienteDireccionRepository.save(clienteDireccion);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: ClienteDireccion[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.clienteDireccionRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['cliente', 'direccion'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<ClienteDireccion> {
    const clienteDireccion = await this.clienteDireccionRepository.findOne({
      where: { idClienteDireccion: id },
      relations: ['cliente', 'direccion'],
    });

    if (!clienteDireccion) {
      throw new NotFoundException(`Cliente dirección con ID ${id} no encontrada`);
    }

    return clienteDireccion;
  }

  async update(id: number, updateClienteDireccionDto: UpdateClienteDireccionDto): Promise<ClienteDireccion> {
    const clienteDireccion = await this.findOne(id);
    
    Object.assign(clienteDireccion, updateClienteDireccionDto);
    return await this.clienteDireccionRepository.save(clienteDireccion);
  }

  async remove(id: number): Promise<void> {
    const clienteDireccion = await this.findOne(id);
    await this.clienteDireccionRepository.remove(clienteDireccion);
  }

  async findByCliente(idCliente: number): Promise<ClienteDireccion[]> {
    return await this.clienteDireccionRepository.find({
      where: { idCliente, activo: true },
      relations: ['cliente', 'direccion'],
    });
  }

  async findPredeterminadaByCliente(idCliente: number): Promise<ClienteDireccion | null> {
    return await this.clienteDireccionRepository.findOne({
      where: { idCliente, esPredeterminada: true, activo: true },
      relations: ['cliente', 'direccion'],
    });
  }
}




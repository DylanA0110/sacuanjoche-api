import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      const newCliente = this.clienteRepository.create({
        ...createClienteDto,
      });

      await this.clienteRepository.save(newCliente);

      return newCliente;
    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.clienteRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({
      idCliente: id,
    });

    if (!cliente) {
      throw new NotFoundException(`El cliente con id ${id} no fue encontrado`);
    }

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    try {
      const cliente = await this.clienteRepository.preload({
        idCliente: id,
        ...updateClienteDto,
      });

      if (!cliente) {
        throw new NotFoundException(
          `El cliente con id ${id} no fue encontrado`,
        );
      }

      return this.clienteRepository.save(cliente);
    } catch (error) {
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteDireccion } from './entities/cliente-direccion.entity';
import { CreateClienteDireccionDto } from './dto/create-cliente-direccion.dto';
import { UpdateClienteDireccionDto } from './dto/update-cliente-direccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class ClienteDireccionService {
  constructor(
    @InjectRepository(ClienteDireccion)
    private readonly clienteDireccionRepository: Repository<ClienteDireccion>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Direccion)
    private readonly direccionRepository: Repository<Direccion>,
  ) {}

  async create(createClienteDireccionDto: CreateClienteDireccionDto) {
    try {
      const { idCliente, idDireccion, ...direccionData } =
        createClienteDireccionDto;

      const [cliente, direccion] = await Promise.all([
        findEntityOrFail(
          this.clienteRepository,
          { idCliente },
          'El cliente no fue encontrado o no existe',
        ),
        findEntityOrFail(
          this.direccionRepository,
          { idDireccion },
          'La dirección no fue encontrada o no existe',
        ),
      ]);

      const newClienteDireccion = this.clienteDireccionRepository.create({
        ...direccionData,
        cliente,
        direccion,
      });

      await this.clienteDireccionRepository.save(newClienteDireccion);

      return this.clienteDireccionRepository.findOne({
        where: {
          idClienteDireccion: newClienteDireccion.idClienteDireccion,
        },
        relations: ['cliente', 'direccion'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.clienteDireccionRepository.find({
      take: limit,
      skip: offset,
      relations: ['cliente', 'direccion'],
    });
  }

  async findOne(id: number) {
    const clienteDireccion = await this.clienteDireccionRepository.findOne({
      where: { idClienteDireccion: id },
      relations: ['cliente', 'direccion'],
    });

    if (!clienteDireccion) {
      throw new NotFoundException(
        `La relación cliente-dirección con id ${id} no fue encontrada`,
      );
    }

    return clienteDireccion;
  }

  async update(
    id: number,
    updateClienteDireccionDto: UpdateClienteDireccionDto,
  ) {
    try {
      const { idCliente, idDireccion, ...toUpdate } = updateClienteDireccionDto;

      const cliente =
        idCliente !== undefined
          ? await findEntityOrFail(
              this.clienteRepository,
              { idCliente },
              'El cliente no fue encontrado o no existe',
            )
          : undefined;

      const direccion =
        idDireccion !== undefined
          ? await findEntityOrFail(
              this.direccionRepository,
              { idDireccion },
              'La dirección no fue encontrada o no existe',
            )
          : undefined;

      const clienteDireccion = await this.clienteDireccionRepository.preload({
        idClienteDireccion: id,
        ...toUpdate,
        cliente,
        direccion,
      });

      if (!clienteDireccion) {
        throw new NotFoundException(
          `La relación cliente-dirección con id ${id} no fue encontrada`,
        );
      }

      return this.clienteDireccionRepository.save(clienteDireccion);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const clienteDireccion = await this.findOne(id);
    await this.clienteDireccionRepository.remove(clienteDireccion);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteDireccion } from './entities/cliente-direccion.entity';
import { CreateClienteDireccionDto } from './dto/create-cliente-direccion.dto';
import { UpdateClienteDireccionDto } from './dto/update-cliente-direccion.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { FindClienteDireccionesDto } from './dto/find-cliente-direcciones.dto';

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

  async findAll(filters: FindClienteDireccionesDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.clienteDireccionRepository
      .createQueryBuilder('clienteDireccion')
      .leftJoinAndSelect('clienteDireccion.cliente', 'cliente')
      .leftJoinAndSelect('clienteDireccion.direccion', 'direccion');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        '(clienteDireccion.etiqueta ILIKE :search OR cliente.primerNombre ILIKE :search OR cliente.primerApellido ILIKE :search OR direccion.formattedAddress ILIKE :search)',
        { search },
      );
    }

    qb.orderBy('clienteDireccion.idClienteDireccion', 'DESC');

    return qb.getMany();
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

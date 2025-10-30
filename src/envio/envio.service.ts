import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Envio } from './entities/envio.entity';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

@Injectable()
export class EnvioService {
  constructor(
    @InjectRepository(Envio)
    private readonly envioRepository: Repository<Envio>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEnvioDto: CreateEnvioDto) {
    try {
      const { idPedido, idEmpleado, ...envioData } = createEnvioDto;

      const [pedido, empleado] = await Promise.all([
        findEntityOrFail(
          this.pedidoRepository,
          { idPedido },
          'El pedido no fue encontrado o no existe',
        ),
        findEntityOrFail(
          this.empleadoRepository,
          { idEmpleado },
          'El empleado no fue encontrado o no existe',
        ),
      ]);

      const newEnvio = this.envioRepository.create({
        ...envioData,
        pedido,
        empleado,
      });

      await this.envioRepository.save(newEnvio);

      return this.envioRepository.findOne({
        where: { idEnvio: newEnvio.idEnvio },
        relations: ['pedido', 'empleado'],
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

    return this.envioRepository.find({
      take: limit,
      skip: offset,
      relations: ['pedido', 'empleado'],
    });
  }

  async findOne(id: number) {
    const envio = await this.envioRepository.findOne({
      where: { idEnvio: id },
      relations: ['pedido', 'empleado'],
    });

    if (!envio) {
      throw new NotFoundException(`El envío con id ${id} no fue encontrado`);
    }

    return envio;
  }

  async update(id: number, updateEnvioDto: UpdateEnvioDto) {
    try {
      const { idPedido, idEmpleado, ...toUpdate } = updateEnvioDto;

      const pedido =
        idPedido !== undefined
          ? await findEntityOrFail(
              this.pedidoRepository,
              { idPedido },
              'El pedido no fue encontrado o no existe',
            )
          : undefined;

      const empleado =
        idEmpleado !== undefined
          ? await findEntityOrFail(
              this.empleadoRepository,
              { idEmpleado },
              'El empleado no fue encontrado o no existe',
            )
          : undefined;

      const envio = await this.envioRepository.preload({
        idEnvio: id,
        ...toUpdate,
        pedido,
        empleado,
      });

      if (!envio) {
        throw new NotFoundException(`El envío con id ${id} no fue encontrado`);
      }

      return this.envioRepository.save(envio);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const envio = await this.findOne(id);
    await this.envioRepository.remove(envio);
  }
}

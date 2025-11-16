import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoHistorial } from './entities/pedido-historial.entity';
import { CreatePedidoHistorialDto } from './dto/create-pedido-historial.dto';
import { UpdatePedidoHistorialDto } from './dto/update-pedido-historial.dto';
import { FindPedidosHistorialDto } from './dto/find-pedidos-historial.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Injectable()
export class PedidoHistorialService {
  constructor(
    @InjectRepository(PedidoHistorial)
    private readonly pedidoHistorialRepository: Repository<PedidoHistorial>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createPedidoHistorialDto: CreatePedidoHistorialDto) {
    try {
      const { idPedido, idEmpleado, estadoAnterior, estadoNuevo, ...rest } =
        createPedidoHistorialDto;

      const pedido = await findEntityOrFail(
        this.pedidoRepository,
        { idPedido },
        'El pedido no fue encontrado o no existe',
      );

      const empleado = await findEntityOrFail(
        this.empleadoRepository,
        { idEmpleado },
        'El empleado no fue encontrado o no existe',
      );

      // Si no se proporciona estadoAnterior, usar el estado actual del pedido
      const estadoAnteriorFinal =
        estadoAnterior !== undefined ? estadoAnterior : pedido.estado;

      // Validar que el estado nuevo sea diferente al anterior
      if (estadoAnteriorFinal === estadoNuevo) {
        throw new BadRequestException(
          'El estado nuevo debe ser diferente al estado anterior',
        );
      }

      const newPedidoHistorial = this.pedidoHistorialRepository.create({
        ...rest,
        pedido,
        empleado,
        estadoAnterior: estadoAnteriorFinal,
        estadoNuevo,
      });

      await this.pedidoHistorialRepository.save(newPedidoHistorial);

      return this.pedidoHistorialRepository.findOne({
        where: { idPedidoHistorial: newPedidoHistorial.idPedidoHistorial },
        relations: ['pedido', 'empleado'],
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(filters: FindPedidosHistorialDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.pedidoHistorialRepository
      .createQueryBuilder('pedidoHistorial')
      .leftJoinAndSelect('pedidoHistorial.pedido', 'pedido')
      .leftJoinAndSelect('pedidoHistorial.empleado', 'empleado');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        `(
          pedidoHistorial.estadoAnterior ILIKE :search OR
          pedidoHistorial.estadoNuevo ILIKE :search OR
          pedidoHistorial.nota ILIKE :search OR
          CAST(pedido.idPedido AS TEXT) ILIKE :search OR
          empleado.primerNombre ILIKE :search OR
          empleado.primerApellido ILIKE :search
        )`,
        { search },
      );
    }

    qb.orderBy('pedidoHistorial.fechaCambio', 'DESC').addOrderBy(
      'pedidoHistorial.idPedidoHistorial',
      'DESC',
    );

    return qb.getMany();
  }

  async findOne(id: number) {
    const pedidoHistorial = await this.pedidoHistorialRepository.findOne({
      where: { idPedidoHistorial: id },
      relations: ['pedido', 'empleado'],
    });

    if (!pedidoHistorial) {
      throw new NotFoundException(
        `El historial de pedido con id ${id} no fue encontrado`,
      );
    }

    return pedidoHistorial;
  }

  async update(
    id: number,
    updatePedidoHistorialDto: UpdatePedidoHistorialDto,
  ) {
    try {
      const { idPedido, idEmpleado, ...toUpdate } = updatePedidoHistorialDto;

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

      const pedidoHistorial = await this.pedidoHistorialRepository.preload({
        idPedidoHistorial: id,
        ...toUpdate,
        pedido,
        empleado,
      });

      if (!pedidoHistorial) {
        throw new NotFoundException(
          `El historial de pedido con id ${id} no fue encontrado`,
        );
      }

      return this.pedidoHistorialRepository.save(pedidoHistorial);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const pedidoHistorial = await this.findOne(id);
    await this.pedidoHistorialRepository.remove(pedidoHistorial);
  }

  async findByPedido(idPedido: number) {
    const pedido = await findEntityOrFail(
      this.pedidoRepository,
      { idPedido },
      'El pedido no fue encontrado o no existe',
    );

    return this.pedidoHistorialRepository.find({
      where: { idPedido: pedido.idPedido },
      relations: ['empleado'],
      order: { fechaCambio: 'DESC' },
    });
  }
}

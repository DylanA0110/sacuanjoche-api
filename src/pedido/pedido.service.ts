import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      const { clienteId, repartidorId, ...pedidoData } = createPedidoDto;

      const cliente = await findEntityOrFail(
        this.clienteRepository,
        { id: clienteId },
        'Cliente not found',
      );

      let repartidor: Empleado | undefined = undefined;
      if (repartidorId) {
        repartidor = await findEntityOrFail(
          this.empleadoRepository,
          { id: repartidorId },
          'Repartidor not found',
        );
      }

      const nuevoPedido = this.pedidoRepository.create({
        ...pedidoData,
        cliente,
        repartidor,
        clienteId,
        repartidorId,
      });

      await this.pedidoRepository.save(nuevoPedido);

      return await this.pedidoRepository.findOne({
        where: { id: nuevoPedido.id },
        relations: ['cliente', 'repartidor'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.pedidoRepository.find({
      take: limit,
      skip: offset,
      relations: ['cliente', 'repartidor'],
    });
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'repartidor', 'detallePedidos', 'factura'],
    });

    if (!pedido)
      throw new NotFoundException(`Pedido with id ${id} not found`);

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const { clienteId, repartidorId, ...toUpdate } = updatePedidoDto;

    let cliente: Cliente | undefined = undefined;
    let repartidor: Empleado | undefined = undefined;

    if (clienteId) {
      cliente = await findEntityOrFail(
        this.clienteRepository,
        { id: clienteId },
        'Cliente not found',
      );
    }

    if (repartidorId) {
      repartidor = await findEntityOrFail(
        this.empleadoRepository,
        { id: repartidorId },
        'Repartidor not found',
      );
    }

    const pedido = await this.pedidoRepository.preload({
      id,
      ...toUpdate,
      cliente,
      repartidor,
      clienteId,
      repartidorId,
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido with id ${id} not found`);
    }

    return this.pedidoRepository.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createFacturaDto: CreateFacturaDto) {
    try {
      const { pedidoId, empleadoId, ...facturaData } = createFacturaDto;

      const pedido = await findEntityOrFail(
        this.pedidoRepository,
        { id: pedidoId },
        'Pedido not found',
      );

      let empleado: Empleado | undefined = undefined;
      if (empleadoId) {
        empleado = await findEntityOrFail(
          this.empleadoRepository,
          { id: empleadoId },
          'Empleado not found',
        );
      }

      const nuevaFactura = this.facturaRepository.create({
        ...facturaData,
        pedido,
        empleado,
        pedidoId,
        empleadoId,
      });

      await this.facturaRepository.save(nuevaFactura);

      return await this.facturaRepository.findOne({
        where: { id: nuevaFactura.id },
        relations: ['pedido', 'empleado'],
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
    return this.facturaRepository.find({
      take: limit,
      skip: offset,
      relations: ['pedido', 'empleado'],
    });
  }

  async findOne(id: number) {
    const factura = await this.facturaRepository.findOne({
      where: { id },
      relations: ['pedido', 'empleado'],
    });

    if (!factura)
      throw new NotFoundException(`Factura with id ${id} not found`);

    return factura;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    const { pedidoId, empleadoId, ...toUpdate } = updateFacturaDto;

    let pedido: Pedido | undefined = undefined;
    let empleado: Empleado | undefined = undefined;

    if (pedidoId) {
      pedido = await findEntityOrFail(
        this.pedidoRepository,
        { id: pedidoId },
        'Pedido not found',
      );
    }

    if (empleadoId) {
      empleado = await findEntityOrFail(
        this.empleadoRepository,
        { id: empleadoId },
        'Empleado not found',
      );
    }

    const factura = await this.facturaRepository.preload({
      id,
      ...toUpdate,
      pedido,
      empleado,
      pedidoId,
      empleadoId,
    });

    if (!factura) {
      throw new NotFoundException(`Factura with id ${id} not found`);
    }

    return this.facturaRepository.save(factura);
  }

  async remove(id: number) {
    const factura = await this.findOne(id);
    await this.facturaRepository.remove(factura);
  }
}

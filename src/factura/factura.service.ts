import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';

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
      const { idPedido, idEmpleado, ...facturaData } = createFacturaDto;

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

      const newFactura = this.facturaRepository.create({
        ...facturaData,
        pedido,
        empleado,
      });

      await this.facturaRepository.save(newFactura);

      return this.facturaRepository.findOne({
        where: { idFactura: newFactura.idFactura },
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

    return this.facturaRepository.find({
      take: limit,
      skip: offset,
      relations: ['pedido', 'empleado'],
    });
  }

  async findOne(id: number) {
    const factura = await this.facturaRepository.findOne({
      where: { idFactura: id },
      relations: ['pedido', 'empleado'],
    });

    if (!factura) {
      throw new NotFoundException(`La factura con id ${id} no fue encontrada`);
    }

    return factura;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    try {
      const { idPedido, idEmpleado, ...toUpdate } = updateFacturaDto;

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

      const factura = await this.facturaRepository.preload({
        idFactura: id,
        ...toUpdate,
        pedido,
        empleado,
      });

      if (!factura) {
        throw new NotFoundException(
          `La factura con id ${id} no fue encontrada`,
        );
      }

      return this.facturaRepository.save(factura);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const factura = await this.findOne(id);
    await this.facturaRepository.remove(factura);
  }
}

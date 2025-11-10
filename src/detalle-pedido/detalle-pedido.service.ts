import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Arreglo } from 'src/arreglo/entities/arreglo.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { FindDetallesPedidoDto } from './dto/find-detalles-pedido.dto';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
  ) {}

  async create(createDetallePedidoDto: CreateDetallePedidoDto) {
    try {
      const { idPedido, idArreglo, ...detalleData } = createDetallePedidoDto;

      const [pedido, arreglo] = await Promise.all([
        findEntityOrFail(
          this.pedidoRepository,
          { idPedido },
          'El pedido no fue encontrado o no existe',
        ),
        findEntityOrFail(
          this.arregloRepository,
          { idArreglo },
          'El arreglo no fue encontrado o no existe',
        ),
      ]);

      const newDetalle = this.detallePedidoRepository.create({
        ...detalleData,
        pedido,
        arreglo,
      });

      await this.detallePedidoRepository.save(newDetalle);

      return this.detallePedidoRepository.findOne({
        where: { idDetallePedido: newDetalle.idDetallePedido },
        relations: ['pedido', 'arreglo'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(filters: FindDetallesPedidoDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.detallePedidoRepository
      .createQueryBuilder('detalle')
      .leftJoinAndSelect('detalle.pedido', 'pedido')
      .leftJoinAndSelect('detalle.arreglo', 'arreglo');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        '(arreglo.nombre ILIKE :search OR CAST(pedido.idPedido AS TEXT) ILIKE :search)',
        { search },
      );
    }

    qb.orderBy('detalle.idDetallePedido', 'DESC');

    return qb.getMany();
  }

  async findOne(id: number) {
    const detalle = await this.detallePedidoRepository.findOne({
      where: { idDetallePedido: id },
      relations: ['pedido', 'arreglo'],
    });

    if (!detalle) {
      throw new NotFoundException(
        `El detalle de pedido con id ${id} no fue encontrado`,
      );
    }

    return detalle;
  }

  async update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto) {
    try {
      const { idPedido, idArreglo, ...toUpdate } = updateDetallePedidoDto;

      const pedido =
        idPedido !== undefined
          ? await findEntityOrFail(
              this.pedidoRepository,
              { idPedido },
              'El pedido no fue encontrado o no existe',
            )
          : undefined;

      const arreglo =
        idArreglo !== undefined
          ? await findEntityOrFail(
              this.arregloRepository,
              { idArreglo },
              'El arreglo no fue encontrado o no existe',
            )
          : undefined;

      const detalle = await this.detallePedidoRepository.preload({
        idDetallePedido: id,
        ...toUpdate,
        pedido,
        arreglo,
      });

      if (!detalle) {
        throw new NotFoundException(
          `El detalle de pedido con id ${id} no fue encontrado`,
        );
      }

      return this.detallePedidoRepository.save(detalle);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const detalle = await this.findOne(id);
    await this.detallePedidoRepository.remove(detalle);
  }
}

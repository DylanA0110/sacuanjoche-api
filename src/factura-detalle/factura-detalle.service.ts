import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacturaDetalle } from './entities/factura-detalle.entity';
import { CreateFacturaDetalleDto } from './dto/create-factura-detalle.dto';
import { UpdateFacturaDetalleDto } from './dto/update-factura-detalle.dto';
import { Factura } from 'src/factura/entities/factura.entity';
import { Arreglo } from 'src/arreglo/entities/arreglo.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { FindFacturasDetalleDto } from './dto/find-facturas-detalle.dto';

@Injectable()
export class FacturaDetalleService {
  constructor(
    @InjectRepository(FacturaDetalle)
    private readonly facturaDetalleRepository: Repository<FacturaDetalle>,
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
  ) {}

  async create(createFacturaDetalleDto: CreateFacturaDetalleDto) {
    try {
      const { idFactura, idArreglo, ...detalleData } = createFacturaDetalleDto;

      const [factura, arreglo] = await Promise.all([
        findEntityOrFail(
          this.facturaRepository,
          { idFactura },
          'La factura no fue encontrada o no existe',
        ),
        findEntityOrFail(
          this.arregloRepository,
          { idArreglo },
          'El arreglo no fue encontrado o no existe',
        ),
      ]);

      const newDetalle = this.facturaDetalleRepository.create({
        ...detalleData,
        factura,
        arreglo,
      });

      await this.facturaDetalleRepository.save(newDetalle);

      return this.facturaDetalleRepository.findOne({
        where: { idFacturaDetalle: newDetalle.idFacturaDetalle },
        relations: ['factura', 'arreglo'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(filters: FindFacturasDetalleDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.facturaDetalleRepository
      .createQueryBuilder('facturaDetalle')
      .leftJoinAndSelect('facturaDetalle.factura', 'factura')
      .leftJoinAndSelect('facturaDetalle.arreglo', 'arreglo');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        `(
          CAST(facturaDetalle.cantidad AS TEXT) ILIKE :search OR
          CAST(facturaDetalle.precioUnitario AS TEXT) ILIKE :search OR
          CAST(facturaDetalle.subtotal AS TEXT) ILIKE :search OR
          CAST(factura.idFactura AS TEXT) ILIKE :search OR
          arreglo.nombre ILIKE :search
        )`,
        { search },
      );
    }

    qb.orderBy('facturaDetalle.idFacturaDetalle', 'DESC');

    return qb.getMany();
  }

  async findOne(id: number) {
    const facturaDetalle = await this.facturaDetalleRepository.findOne({
      where: { idFacturaDetalle: id },
      relations: ['factura', 'arreglo'],
    });

    if (!facturaDetalle) {
      throw new NotFoundException(
        `El detalle de factura con id ${id} no fue encontrado`,
      );
    }

    return facturaDetalle;
  }

  async update(
    id: number,
    updateFacturaDetalleDto: UpdateFacturaDetalleDto,
  ) {
    try {
      const { idFactura, idArreglo, ...toUpdate } = updateFacturaDetalleDto;

      const factura =
        idFactura !== undefined
          ? await findEntityOrFail(
              this.facturaRepository,
              { idFactura },
              'La factura no fue encontrada o no existe',
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

      const facturaDetalle = await this.facturaDetalleRepository.preload({
        idFacturaDetalle: id,
        ...toUpdate,
        factura,
        arreglo,
      });

      if (!facturaDetalle) {
        throw new NotFoundException(
          `El detalle de factura con id ${id} no fue encontrado`,
        );
      }

      return this.facturaDetalleRepository.save(facturaDetalle);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const facturaDetalle = await this.findOne(id);
    await this.facturaDetalleRepository.remove(facturaDetalle);
  }

  async findByFactura(idFactura: number) {
    const factura = await findEntityOrFail(
      this.facturaRepository,
      { idFactura },
      'La factura no fue encontrada o no existe',
    );

    return this.facturaDetalleRepository.find({
      where: { idFactura: factura.idFactura },
      relations: ['arreglo'],
      order: { idFacturaDetalle: 'ASC' },
    });
  }
}


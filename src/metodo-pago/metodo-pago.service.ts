import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPago } from './entities/metodo-pago.entity';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { FindMetodosPagoDto } from './dto/find-metodos-pago.dto';
import { PedidoCanal } from 'src/common/enums/pedido-canal.enum';
import { MetodoPagoTipo } from 'src/common/enums/metodo-pago-tipo.enum';
import { MetodoPagoEstado } from 'src/common/enums/metodo-pago-estado.enum';

@Injectable()
export class MetodoPagoService {
  constructor(
    @InjectRepository(MetodoPago)
    private readonly metodoPagoRepository: Repository<MetodoPago>,
  ) {}

  async create(createMetodoPagoDto: CreateMetodoPagoDto) {
    try {
      const { tipo, canalesDisponibles, ...rest } = createMetodoPagoDto;

      // Si no se especifica tipo, inferirlo de los canales disponibles
      let tipoFinal = tipo;
      let canalesFinal = canalesDisponibles;

      if (!tipoFinal && canalesFinal) {
        // Inferir tipo basado en canales
        if (canalesFinal.length === 1) {
          tipoFinal =
            canalesFinal[0] === PedidoCanal.WEB
              ? MetodoPagoTipo.ONLINE
              : MetodoPagoTipo.EFECTIVO;
        } else {
          tipoFinal = MetodoPagoTipo.MIXTO;
        }
      } else if (!canalesFinal && tipoFinal) {
        // Inferir canales basado en tipo
        switch (tipoFinal) {
          case MetodoPagoTipo.ONLINE:
            canalesFinal = [PedidoCanal.WEB];
            break;
          case MetodoPagoTipo.EFECTIVO:
          case MetodoPagoTipo.TARJETA_FISICA:
            canalesFinal = [PedidoCanal.INTERNO];
            break;
          case MetodoPagoTipo.MIXTO:
          default:
            canalesFinal = [PedidoCanal.WEB, PedidoCanal.INTERNO];
            break;
        }
      } else if (!tipoFinal && !canalesFinal) {
        // Valores por defecto
        tipoFinal = MetodoPagoTipo.MIXTO;
        canalesFinal = [PedidoCanal.WEB, PedidoCanal.INTERNO];
      }

      const newMetodoPago = this.metodoPagoRepository.create({
        ...rest,
        tipo: tipoFinal,
        canalesDisponibles: canalesFinal,
      });

      await this.metodoPagoRepository.save(newMetodoPago);

      return newMetodoPago;
    } catch (error) {
      handleDbException(error);
    }
  }

  /**
   * Obtiene los métodos de pago disponibles para un canal específico
   */
  async findByCanal(canal: PedidoCanal): Promise<MetodoPago[]> {
    return this.metodoPagoRepository
      .createQueryBuilder('metodoPago')
      .where('metodoPago.estado = :estado', { estado: MetodoPagoEstado.ACTIVO })
      .andWhere(':canal = ANY(metodoPago.canalesDisponibles)', { canal })
      .orderBy('metodoPago.descripcion', 'ASC')
      .getMany();
  }

  async findAll(filters: FindMetodosPagoDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.metodoPagoRepository.createQueryBuilder('metodoPago');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere('(metodoPago.descripcion ILIKE :search)', { search });
    }

    qb.orderBy('metodoPago.descripcion', 'ASC').addOrderBy(
      'metodoPago.idMetodoPago',
      'ASC',
    );

    return qb.getMany();
  }

  async findOne(id: number) {
    const metodoPago = await this.metodoPagoRepository.findOneBy({
      idMetodoPago: id,
    });

    if (!metodoPago) {
      throw new NotFoundException(
        `El método de pago con id ${id} no fue encontrado`,
      );
    }

    return metodoPago;
  }

  async update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto) {
    try {
      const metodoPago = await this.metodoPagoRepository.preload({
        idMetodoPago: id,
        ...updateMetodoPagoDto,
      });

      if (!metodoPago) {
        throw new NotFoundException(
          `El método de pago con id ${id} no fue encontrado`,
        );
      }

      return this.metodoPagoRepository.save(metodoPago);
    } catch (error) {
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const metodoPago = await this.findOne(id);
    await this.metodoPagoRepository.remove(metodoPago);
  }
}

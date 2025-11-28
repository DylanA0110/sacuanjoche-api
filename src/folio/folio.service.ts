import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folio } from './entities/folio.entity';
import { CreateFolioDto } from './dto/create-folio.dto';
import { UpdateFolioDto } from './dto/update-folio.dto';
import { FindFoliosDto } from './dto/find-folios.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { findEntityOrFail } from 'src/common/helpers/find-entity.helper';
import { EstadoActivo } from 'src/common/enums';

@Injectable()
export class FolioService {
  constructor(
    @InjectRepository(Folio)
    private readonly folioRepository: Repository<Folio>,
  ) {}

  async create(createFolioDto: CreateFolioDto) {
    try {
      // Validar que no exista otro folio activo para el mismo documento
      const folioExistente = await this.folioRepository.findOne({
        where: {
          documento: createFolioDto.documento,
          activo: EstadoActivo.ACTIVO,
        },
      });

      if (folioExistente) {
        throw new BadRequestException(
          `Ya existe un folio activo para el documento "${createFolioDto.documento}".`,
        );
      }

      // Validar que valorInicial <= valorFinal
      if (createFolioDto.valorInicial > createFolioDto.valorFinal) {
        throw new BadRequestException(
          'El valor inicial no puede ser mayor que el valor final.',
        );
      }

      // Validar que ultimoValor esté en el rango válido
      // Permitir que ultimoValor sea valorInicial - 1 (ej: 0 cuando valorInicial es 1) para folios nuevos
      // O que esté entre valorInicial y valorFinal si ya se han usado números
      if (
        createFolioDto.ultimoValor < createFolioDto.valorInicial - 1 ||
        createFolioDto.ultimoValor > createFolioDto.valorFinal
      ) {
        throw new BadRequestException(
          'El último valor debe estar entre el valor inicial y el valor final.',
        );
      }

      const newFolio = this.folioRepository.create(createFolioDto);
      await this.folioRepository.save(newFolio);

      return newFolio;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async findAll(filters: FindFoliosDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.folioRepository.createQueryBuilder('folio');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        '(folio.descripcion ILIKE :search OR folio.documento ILIKE :search)',
        { search },
      );
    }

    qb.orderBy('folio.fechaCreacion', 'DESC').addOrderBy(
      'folio.idFolio',
      'DESC',
    );

    return qb.getMany();
  }

  async findOne(id: number) {
    const folio = await this.folioRepository.findOne({
      where: { idFolio: id },
    });

    if (!folio) {
      throw new NotFoundException(`El folio con id ${id} no fue encontrado`);
    }

    return folio;
  }

  async update(id: number, updateFolioDto: UpdateFolioDto) {
    try {
      const folio = await this.folioRepository.preload({
        idFolio: id,
        ...updateFolioDto,
      });

      if (!folio) {
        throw new NotFoundException(
          `El folio con id ${id} no fue encontrado`,
        );
      }

      // Validaciones si se actualizan valores
      if (
        updateFolioDto.valorInicial !== undefined ||
        updateFolioDto.valorFinal !== undefined
      ) {
        const valorInicial =
          updateFolioDto.valorInicial ?? folio.valorInicial;
        const valorFinal = updateFolioDto.valorFinal ?? folio.valorFinal;

        if (valorInicial > valorFinal) {
          throw new BadRequestException(
            'El valor inicial no puede ser mayor que el valor final.',
          );
        }
      }

      if (updateFolioDto.ultimoValor !== undefined) {
        const valorInicial =
          updateFolioDto.valorInicial ?? folio.valorInicial;
        const valorFinal = updateFolioDto.valorFinal ?? folio.valorFinal;
        const ultimoValor = updateFolioDto.ultimoValor;

        if (ultimoValor < valorInicial || ultimoValor > valorFinal) {
          throw new BadRequestException(
            'El último valor debe estar entre el valor inicial y el valor final.',
          );
        }
      }

      return this.folioRepository.save(folio);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const folio = await this.findOne(id);
    await this.folioRepository.remove(folio);
  }

  /**
   * Busca un folio activo por documento (sin importar mayúsculas/minúsculas)
   * @param documento Tipo de documento (ej: 'FACTURA', 'PEDIDO', etc.)
   * @returns El folio encontrado o null
   */
  async buscarFolioPorDocumento(documento: string): Promise<Folio | null> {
    const folio = await this.folioRepository
      .createQueryBuilder('folio')
      .where('LOWER(folio.documento) = LOWER(:documento)', { documento })
      .andWhere('folio.activo = :activo', { activo: EstadoActivo.ACTIVO })
      .getOne();

    return folio;
  }

  /**
   * Obtiene el siguiente número de folio para un documento específico
   * @param documento Tipo de documento (ej: 'FACTURA', 'PEDIDO', etc.)
   * @returns El siguiente número de folio formateado según la máscara
   */
  async obtenerSiguienteFolio(documento: string): Promise<string> {
    // Buscar el folio sin importar mayúsculas/minúsculas
    const folio = await this.buscarFolioPorDocumento(documento);

    if (!folio) {
      throw new BadRequestException(
        `No existe folio activo para el documento: ${documento}`,
      );
    }

    let siguiente = folio.ultimoValor + 1;

    if (siguiente > folio.valorFinal) {
      throw new BadRequestException(
        `Se alcanzó el valor máximo del folio (${folio.valorFinal}).`,
      );
    }

    // .padStart rellena con ceros a la izquierda hasta que alcanza la longitud establecida para ese folio
    const numeroFormateado = String(siguiente).padStart(folio.longitud, '0');

    let resultado: string;
    if (folio.mascara) {
      resultado = folio.mascara.replace(/\{0+\}/, numeroFormateado);
    } else {
      resultado = numeroFormateado;
    }

    folio.ultimoValor = siguiente;
    await this.folioRepository.save(folio);

    return resultado;
  }
}


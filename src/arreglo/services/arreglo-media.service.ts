import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Arreglo } from '../entities/arreglo.entity';
import { ArregloMedia } from '../entities/arreglo-media.entity';
import { CreateArregloMediaSimpleDto } from '../dto/create-arreglo-media-simple.dto';
import { CreateArregloMediaBatchDto } from '../dto/create-arreglo-media-batch.dto';
import { UpdateArregloMediaSupabaseDto } from '../dto/update-arreglo-media-supabase.dto';

@Injectable()
export class ArregloMediaService {
  constructor(
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
    @InjectRepository(ArregloMedia)
    private readonly mediaRepository: Repository<ArregloMedia>,
  ) {}

  /**
   * Obtener todas las imágenes activas de un arreglo
   */
  async listByArreglo(arregloId: number): Promise<ArregloMedia[]> {
    return this.mediaRepository.find({
      where: { idArreglo: arregloId, activo: true },
      order: { orden: 'ASC', idArregloMedia: 'ASC' },
    });
  }

  /**
   * Crear un registro de media desde Supabase (solo URL)
   */
  async create(
    arregloId: number,
    dto: CreateArregloMediaSimpleDto,
  ): Promise<ArregloMedia> {
    const arreglo = await this.findArregloOrFail(arregloId);

    const orden = dto.orden ?? (await this.getNextOrden(arregloId));

    // Extraer objectKey de la URL de Supabase si es posible
    // Formato: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    let objectKey = '';
    try {
      const urlObj = new URL(dto.url);
      const pathParts = urlObj.pathname.split('/');
      const bucketIndex = pathParts.indexOf('public');
      if (bucketIndex !== -1 && pathParts[bucketIndex + 1]) {
        objectKey = pathParts.slice(bucketIndex + 1).join('/');
      } else {
        objectKey = dto.url; // Fallback a la URL completa
      }
    } catch {
      objectKey = dto.url; // Fallback a la URL completa
    }

    const media = this.mediaRepository.create({
      idArreglo: arregloId,
      url: dto.url,
      objectKey: objectKey,
      provider: 'supabase',
      contentType: 'image/jpeg',
      orden: orden,
      isPrimary: dto.isPrimary ?? false,
      altText: dto.altText,
      activo: true,
    });

    const saved = await this.mediaRepository.save(media);

    // Sincronizar estado de imagen principal
    if (dto.isPrimary) {
      await this.syncPrimaryState(arreglo, saved, true);
    }

    return saved;
  }

  /**
   * Crear múltiples registros de media en batch
   */
  async createBatch(
    arregloId: number,
    dto: CreateArregloMediaBatchDto,
  ): Promise<ArregloMedia[]> {
    const arreglo = await this.findArregloOrFail(arregloId);
    const nextOrden = await this.getNextOrden(arregloId);

    const mediaArray = dto.imagenes.map((imagen, index) => {
      // Extraer objectKey de la URL de Supabase
      let objectKey = '';
      try {
        const urlObj = new URL(imagen.url);
        const pathParts = urlObj.pathname.split('/');
        const bucketIndex = pathParts.indexOf('public');
        if (bucketIndex !== -1 && pathParts[bucketIndex + 1]) {
          objectKey = pathParts.slice(bucketIndex + 1).join('/');
        } else {
          objectKey = imagen.url;
        }
      } catch {
        objectKey = imagen.url;
      }

      return this.mediaRepository.create({
        idArreglo: arregloId,
        url: imagen.url,
        objectKey: objectKey,
        provider: 'supabase',
        contentType: 'image/jpeg',
        orden: imagen.orden ?? nextOrden + index,
        isPrimary: imagen.isPrimary ?? false,
        altText: imagen.altText,
        activo: true,
      });
    });

    const saved = await this.mediaRepository.save(mediaArray);

    // Si alguna imagen es principal, sincronizar
    const primaryImage = saved.find((m) => m.isPrimary);
    if (primaryImage) {
      await this.syncPrimaryState(arreglo, primaryImage, true);
    }

    return saved;
  }

  /**
   * Actualizar un registro de media
   */
  async update(
    arregloId: number,
    mediaId: number,
    dto: UpdateArregloMediaSupabaseDto,
  ): Promise<ArregloMedia> {
    const media = await this.mediaRepository.findOne({
      where: { idArregloMedia: mediaId, idArreglo: arregloId },
    });

    if (!media) {
      throw new NotFoundException('La imagen solicitada no existe.');
    }

    if (dto.orden !== undefined) {
      media.orden = dto.orden;
    }

    // Si se proporciona tipo, actualizar contentType
    if (dto.tipo !== undefined) {
      if (dto.tipo === 'imagen') {
        media.contentType = 'image/jpeg';
      } else if (dto.tipo === 'video') {
        media.contentType = 'video/mp4';
      }
    }

    if (dto.altText !== undefined) {
      media.altText = dto.altText;
    }

    const saved = await this.mediaRepository.save(media);

    // Si se actualiza isPrimary, sincronizar estado
    if (dto.isPrimary !== undefined) {
      const arreglo = await this.findArregloOrFail(arregloId);
      await this.syncPrimaryState(arreglo, saved, dto.isPrimary);
    }

    return saved;
  }

  /**
   * Eliminar (desactivar) un registro de media
   */
  async delete(arregloId: number, mediaId: number): Promise<void> {
    const media = await this.mediaRepository.findOne({
      where: { idArregloMedia: mediaId, idArreglo: arregloId },
    });

    if (!media) {
      throw new NotFoundException('La imagen solicitada no existe.');
    }

    // Solo desactivamos (no eliminamos el archivo de Supabase)
    media.activo = false;
    await this.mediaRepository.save(media);

    // Si era principal, resetear
    if (media.isPrimary) {
      await this.resetArregloPrimaryFromGallery(arregloId);
    }
  }

  private async findArregloOrFail(arregloId: number): Promise<Arreglo> {
    const arreglo = await this.arregloRepository.findOne({
      where: { idArreglo: arregloId },
      relations: ['media'],
    });

    if (!arreglo) {
      throw new NotFoundException(`El arreglo ${arregloId} no existe.`);
    }

    return arreglo;
  }

  private async getNextOrden(arregloId: number): Promise<number> {
    const { max } = await this.mediaRepository
      .createQueryBuilder('media')
      .select('COALESCE(MAX(media.orden), -1)', 'max')
      .where('media.idArreglo = :arregloId', { arregloId })
      .andWhere('media.activo = true')
      .getRawOne<{ max: number }>();

    return (max ?? -1) + 1;
  }

  private async syncPrimaryState(
    arreglo: Arreglo,
    candidate: ArregloMedia,
    candidateIsPrimary: boolean,
  ) {
    if (candidateIsPrimary) {
      await this.mediaRepository.update(
        {
          idArreglo: arreglo.idArreglo,
          isPrimary: true,
          idArregloMedia: Not(candidate.idArregloMedia),
        },
        { isPrimary: false },
      );
      await this.mediaRepository.update(candidate.idArregloMedia, {
        isPrimary: true,
      });
      await this.arregloRepository.update(arreglo.idArreglo, {
        url: candidate.url,
      });
      return;
    }

    const stillHasPrimary = await this.mediaRepository.exist({
      where: { idArreglo: arreglo.idArreglo, isPrimary: true, activo: true },
    });

    if (!stillHasPrimary) {
      const fallback = await this.mediaRepository.findOne({
        where: { idArreglo: arreglo.idArreglo, activo: true },
        order: { orden: 'ASC', idArregloMedia: 'ASC' },
      });

      await this.arregloRepository.update(arreglo.idArreglo, {
        url: fallback?.url ?? null,
      });

      if (fallback) {
        await this.mediaRepository.update(fallback.idArregloMedia, {
          isPrimary: true,
        });
      }
    }
  }

  private async resetArregloPrimaryFromGallery(arregloId: number) {
    const fallback = await this.mediaRepository.findOne({
      where: { idArreglo: arregloId, activo: true },
      order: { orden: 'ASC', idArregloMedia: 'ASC' },
    });

    await this.arregloRepository.update(arregloId, {
      url: fallback?.url ?? null,
    });

    if (fallback) {
      fallback.isPrimary = true;
      await this.mediaRepository.save(fallback);
    }
  }
}

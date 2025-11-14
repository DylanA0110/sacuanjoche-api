import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { SpacesService } from 'src/common/storage/spaces.service';
import { Arreglo } from '../entities/arreglo.entity';
import { ArregloMedia } from '../entities/arreglo-media.entity';
import { CreateArregloMediaDto } from '../dto/create-arreglo-media.dto';
import { UpdateArregloMediaDto } from '../dto/update-arreglo-media.dto';
import { GenerateUploadUrlDto } from '../dto/generate-upload-url.dto';

@Injectable()
export class ArregloMediaService {
  constructor(
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
    @InjectRepository(ArregloMedia)
    private readonly mediaRepository: Repository<ArregloMedia>,
    private readonly spacesService: SpacesService,
  ) {}

  async generateUploadUrl(dto: GenerateUploadUrlDto) {
    if (dto.arregloId) {
      await this.findArregloOrFail(dto.arregloId);
    }

    const keyPrefix = dto.arregloId
      ? `arreglos/${dto.arregloId}/media`
      : 'arreglos/general';

    return this.spacesService.generateUploadUrl({
      keyPrefix,
      fileName: dto.fileName,
      contentType: dto.contentType,
      contentLength: dto.contentLength,
    });
  }

  async listByArreglo(arregloId: number): Promise<ArregloMedia[]> {
    return this.mediaRepository.find({
      where: { idArreglo: arregloId, activo: true },
      order: { orden: 'ASC', idArregloMedia: 'ASC' },
    });
  }

  async create(arregloId: number, dto: CreateArregloMediaDto) {
    const arreglo = await this.findArregloOrFail(arregloId);

    const orden = dto.orden ?? (await this.getNextOrden(arregloId));

    const media = this.mediaRepository.create({
      ...dto,
      orden,
      idArreglo: arregloId,
      provider: dto.provider ?? 'spaces',
      isPrimary: dto.isPrimary ?? false,
      activo: true,
    });

    if (dto.metadata) {
      media.metadata = dto.metadata;
    }

    const saved = await this.mediaRepository.save(media);

    await this.syncPrimaryState(arreglo, saved, dto.isPrimary ?? false);

    return saved;
  }

  async update(
    arregloId: number,
    mediaId: number,
    dto: UpdateArregloMediaDto,
  ): Promise<ArregloMedia> {
    const media = await this.mediaRepository.findOne({
      where: { idArregloMedia: mediaId, idArreglo: arregloId },
    });

    if (!media) {
      throw new NotFoundException('La imagen solicitada no existe.');
    }

    Object.assign(media, dto);

    if (dto.metadata) {
      media.metadata = dto.metadata;
    }

    const saved = await this.mediaRepository.save(media);

    if (dto.isPrimary !== undefined) {
      const arreglo = await this.findArregloOrFail(arregloId);
      await this.syncPrimaryState(arreglo, saved, dto.isPrimary);
    }

    return saved;
  }

  async deactivate(
    arregloId: number,
    mediaId: number,
    options?: { deleteObject?: boolean },
  ): Promise<void> {
    const media = await this.mediaRepository.findOne({
      where: { idArregloMedia: mediaId, idArreglo: arregloId },
    });

    if (!media) {
      throw new NotFoundException('La imagen solicitada no existe.');
    }

    media.activo = false;
    await this.mediaRepository.save(media);

    if (options?.deleteObject) {
      await this.safeDeleteObject(media.objectKey);
    }

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

  private async safeDeleteObject(objectKey: string) {
    try {
      await this.spacesService.deleteObject(objectKey);
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudo eliminar el objeto remoto. Intenta nuevamente más tarde.',
      );
    }
  }
}

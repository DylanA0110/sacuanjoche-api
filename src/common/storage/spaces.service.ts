import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import * as https from 'node:https';

export interface GenerateUploadUrlParams {
  /** Optional base folder where the object will be stored */
  keyPrefix?: string;
  /** Optional original filename to help derive the extension */
  fileName?: string;
  /** MIME type of the file that will be uploaded */
  contentType: string;
  /** Size in bytes of the file that will be uploaded */
  contentLength: number;
  /** Seconds for which the signed URL will remain valid */
  expiresInSeconds?: number;
  /** Optional metadata to be stored directly on the object */
  metadata?: Record<string, string>;
  /** ACL that should be applied to the uploaded object */
  acl?: 'private' | 'public-read';
}

export interface GeneratedUploadUrl {
  uploadUrl: string;
  expiresAt: string;
  objectKey: string;
  publicUrl: string;
}

@Injectable()
export class SpacesService {
  private readonly logger = new Logger(SpacesService.name);
  private readonly client: S3Client | null;
  private readonly bucket: string | null;
  private readonly publicBaseUrl: string;
  private readonly defaultExpirySeconds: number;
  private readonly defaultAcl: 'public-read' | 'private';
  private readonly isConfigured: boolean;
  private readonly maxUploadBytes: number;

  constructor(private readonly configService: ConfigService) {
    const bucket = this.configService.get<string>('DO_SPACES_BUCKET');
    const region = this.configService.get<string>('DO_SPACES_REGION');
    const endpoint = this.configService.get<string>('DO_SPACES_ENDPOINT');
    const accessKeyId = this.configService.get<string>('DO_SPACES_KEY');
    const secretAccessKey = this.configService.get<string>('DO_SPACES_SECRET');

    if (!bucket || !region || !accessKeyId || !secretAccessKey) {
      this.logger.warn(
        'DigitalOcean Spaces no está completamente configurado. Define las variables DO_SPACES_* para habilitar las cargas de imágenes.',
      );
      this.bucket = null;
      this.client = null;
      this.publicBaseUrl = '';
      this.isConfigured = false;
    } else {
      this.bucket = bucket;

      // Usar endpoint personalizado o construir el endpoint estándar
      // Si hay problemas SSL, puedes configurar DO_SPACES_ENDPOINT con un endpoint alternativo
      const resolvedEndpoint =
        endpoint ?? `https://${bucket}.${region}.digitaloceanspaces.com`;

      // Verificar que el endpoint use HTTPS
      if (!resolvedEndpoint.startsWith('https://')) {
        this.logger.warn(
          `El endpoint de DigitalOcean Spaces debe usar HTTPS. Endpoint actual: ${resolvedEndpoint}`,
        );
      }

      // Configuración SSL para manejar certificados correctamente
      const httpsAgent = new https.Agent({
        rejectUnauthorized: true, // Verificar certificados SSL
        keepAlive: true,
      });

      this.client = new S3Client({
        region,
        endpoint: resolvedEndpoint,
        forcePathStyle: false,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        requestHandler: {
          httpsAgent,
        },
      });

      const cdnUrl = this.configService.get<string>('DO_SPACES_CDN_URL');
      const customPublicUrl = this.configService.get<string>(
        'DO_SPACES_PUBLIC_BASE_URL',
      );
      this.publicBaseUrl =
        cdnUrl?.replace(/\/$/, '') ??
        customPublicUrl?.replace(/\/$/, '') ??
        resolvedEndpoint.replace(/\/$/, '');

      this.isConfigured = true;
    }

    this.defaultExpirySeconds = Number(
      this.configService.get<string>('DO_SPACES_UPLOAD_EXPIRATION') ?? '3600',
    );

    this.defaultAcl = (this.configService.get<string>(
      'DO_SPACES_DEFAULT_ACL',
    ) ?? 'public-read') as 'public-read' | 'private';

    const configuredMaxBytes = this.configService.get<string>(
      'DO_SPACES_MAX_UPLOAD_BYTES',
    );
    const parsedMax = configuredMaxBytes ? Number(configuredMaxBytes) : NaN;
    this.maxUploadBytes =
      Number.isFinite(parsedMax) && parsedMax > 0 ? parsedMax : 5 * 1024 * 1024;
  }

  async generateUploadUrl(
    params: GenerateUploadUrlParams,
  ): Promise<GeneratedUploadUrl> {
    this.ensureConfigured();

    if (!params.contentType) {
      throw new InternalServerErrorException(
        'El parámetro contentType es obligatorio para generar la URL firmada.',
      );
    }

    if (!Number.isFinite(params.contentLength) || params.contentLength <= 0) {
      throw new InternalServerErrorException(
        'El tamaño del archivo (contentLength) debe ser un número positivo.',
      );
    }

    if (params.contentLength > this.maxUploadBytes) {
      throw new InternalServerErrorException(
        `El archivo excede el tamaño máximo permitido de ${this.maxUploadBytes} bytes.`,
      );
    }

    const folder = params.keyPrefix?.replace(/\/$/, '') ?? 'uploads';
    const extension = this.resolveExtension(
      params.contentType,
      params.fileName,
    );
    const key = `${folder}/${this.buildObjectName(extension)}`;

    const expiresIn = params.expiresInSeconds ?? this.defaultExpirySeconds;
    const acl = params.acl ?? this.defaultAcl;

    const command = new PutObjectCommand({
      Bucket: this.bucket!,
      Key: key,
      ContentType: params.contentType,
      ContentLength: params.contentLength,
      ACL: acl,
      Metadata: params.metadata,
    });

    try {
      const uploadUrl = await getSignedUrl(this.client!, command, {
        expiresIn,
      });

      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

      return {
        uploadUrl,
        expiresAt,
        objectKey: key,
        publicUrl: this.buildPublicUrl(key),
      };
    } catch (error) {
      this.logger.error('No se pudo generar la URL firmada para Spaces', error);
      throw new InternalServerErrorException(
        'No se pudo generar la URL de carga para DigitalOcean Spaces.',
      );
    }
  }

  buildPublicUrl(objectKey: string): string {
    const cleanKey = objectKey.replace(/^\//, '');
    return `${this.publicBaseUrl}/${cleanKey}`;
  }

  async deleteObject(objectKey: string): Promise<void> {
    this.ensureConfigured();

    try {
      await this.client!.send(
        new DeleteObjectCommand({ Bucket: this.bucket!, Key: objectKey }),
      );
    } catch (error) {
      this.logger.error(`No se pudo eliminar el objeto ${objectKey}`, error);
      throw new InternalServerErrorException(
        'No se pudo eliminar el objeto en DigitalOcean Spaces.',
      );
    }
  }

  private ensureConfigured() {
    if (!this.isConfigured || !this.client || !this.bucket) {
      throw new InternalServerErrorException(
        'DigitalOcean Spaces no está configurado. Define las variables DO_SPACES_* y reinicia la aplicación.',
      );
    }
  }

  private buildObjectName(extension: string): string {
    const uuid = randomUUID();
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const sanitizedExtension = extension ? extension.replace(/^\./, '') : '';
    return sanitizedExtension
      ? `${timestamp}-${uuid}.${sanitizedExtension}`
      : `${timestamp}-${uuid}`;
  }

  private resolveExtension(contentType: string, fileName?: string): string {
    const extFromName = fileName ? extname(fileName) : '';
    if (extFromName) {
      return extFromName;
    }

    const map: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
      'image/avif': '.avif',
    };

    return map[contentType] ?? '';
  }
}

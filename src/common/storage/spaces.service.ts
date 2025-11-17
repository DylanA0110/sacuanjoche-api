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
      // Formato correcto: https://bucket.region.digitaloceanspaces.com
      // NO debe ser: https://bucket.bucket.region.digitaloceanspaces.com
      let resolvedEndpoint: string;
      
      if (endpoint) {
        // Normalizar endpoint personalizado: eliminar duplicados del bucket
        resolvedEndpoint = endpoint.trim();
        // Si el endpoint tiene el bucket duplicado, corregirlo
        const duplicatePattern = new RegExp(`^https?://${bucket}\\.${bucket}\\.`, 'i');
        if (duplicatePattern.test(resolvedEndpoint)) {
          this.logger.warn(
            `Endpoint tiene el bucket duplicado. Corrigiendo de ${resolvedEndpoint}...`,
          );
          resolvedEndpoint = resolvedEndpoint.replace(
            new RegExp(`^https?://${bucket}\\.${bucket}\\.`, 'i'),
            `https://${bucket}.`,
          );
        }
      } else {
        // Construir endpoint estándar: bucket.region.digitaloceanspaces.com
        resolvedEndpoint = `https://${bucket}.${region}.digitaloceanspaces.com`;
      }

      // Asegurar que use HTTPS
      if (!resolvedEndpoint.startsWith('https://')) {
        if (resolvedEndpoint.startsWith('http://')) {
          resolvedEndpoint = resolvedEndpoint.replace('http://', 'https://');
        } else {
          resolvedEndpoint = `https://${resolvedEndpoint}`;
        }
        this.logger.warn(
          `Endpoint corregido para usar HTTPS: ${resolvedEndpoint}`,
        );
      }

      // Validar formato del endpoint
      const validPattern = /^https:\/\/[^.]+\.[^.]+\.digitaloceanspaces\.com$/;
      if (!validPattern.test(resolvedEndpoint)) {
        this.logger.error(
          `Endpoint inválido: ${resolvedEndpoint}. Debe ser: https://bucket.region.digitaloceanspaces.com`,
        );
      } else {
        this.logger.log(`Endpoint configurado correctamente: ${resolvedEndpoint}`);
      }

      // Configuración SSL para manejar certificados correctamente
      // Permite configurar mediante variable de entorno DO_SPACES_REJECT_UNAUTHORIZED
      // Por defecto, no rechazar certificados para evitar problemas SSL comunes
      const rejectUnauthorizedEnv = this.configService.get<string>(
        'DO_SPACES_REJECT_UNAUTHORIZED',
      );
      const rejectUnauthorized =
        rejectUnauthorizedEnv === 'true' || rejectUnauthorizedEnv === '1';
      
      const httpsAgent = new https.Agent({
        rejectUnauthorized: rejectUnauthorized,
        keepAlive: true,
      });

      this.logger.log(
        `Configuración SSL: rejectUnauthorized=${rejectUnauthorized}`,
      );

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
    } catch (error: any) {
      // Log detallado del error
      this.logger.error('No se pudo generar la URL firmada para Spaces', {
        error: error.message,
        stack: error.stack,
        code: error.code,
        name: error.name,
        fileName: params.fileName,
        contentType: params.contentType,
        contentLength: params.contentLength,
      });

      // Detectar errores SSL específicos
      const isSSLError =
        error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' ||
        error.code === 'CERT_HAS_EXPIRED' ||
        error.code === 'SELF_SIGNED_CERT_IN_CHAIN' ||
        error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT' ||
        error.code === 'CERT_UNTRUSTED' ||
        error.message?.toLowerCase().includes('certificate') ||
        error.message?.toLowerCase().includes('ssl') ||
        error.message?.toLowerCase().includes('tls') ||
        error.name === 'SSLException';

      if (isSSLError) {
        throw new InternalServerErrorException(
          `Error SSL al conectar con DigitalOcean Spaces: ${error.message || error.code || 'Error desconocido de certificado SSL'}. Verifica la configuración del certificado SSL del servidor o configura DO_SPACES_REJECT_UNAUTHORIZED=false en las variables de entorno.`,
        );
      }

      throw new InternalServerErrorException(
        `No se pudo generar la URL de carga para DigitalOcean Spaces: ${error.message || 'Error desconocido'}.`,
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
    } catch (error: any) {
      this.logger.error(`No se pudo eliminar el objeto ${objectKey}`, {
        error: error.message,
        stack: error.stack,
        code: error.code,
        name: error.name,
        objectKey,
      });

      // Detectar errores SSL también en delete
      const isSSLError =
        error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' ||
        error.code === 'CERT_HAS_EXPIRED' ||
        error.message?.toLowerCase().includes('certificate') ||
        error.message?.toLowerCase().includes('ssl');

      if (isSSLError) {
        throw new InternalServerErrorException(
          `Error SSL al eliminar objeto en DigitalOcean Spaces: ${error.message || error.code}. Verifica la configuración SSL.`,
        );
      }

      throw new InternalServerErrorException(
        `No se pudo eliminar el objeto en DigitalOcean Spaces: ${error.message || 'Error desconocido'}.`,
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

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateArregloMediaDto {
  @ApiProperty({
    description: 'URL pública devuelta por el proveedor de almacenamiento',
    example: 'https://cdn.example.com/arreglos/123/imagen.jpg',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Ruta interna (object key) dentro del almacenamiento',
    example: 'arreglos/123/imagen.jpg',
  })
  @IsString()
  @MaxLength(255)
  objectKey: string;

  @ApiProperty({
    description: 'Proveedor responsable del archivo (spaces, cloudinary, etc.)',
    example: 'spaces',
    required: false,
    default: 'spaces',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  provider?: string;

  @ApiProperty({
    description: 'Tipo de contenido del archivo',
    example: 'image/jpeg',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  contentType?: string;

  @ApiProperty({
    description: 'Texto alternativo para la imagen',
    example: 'Ramo de flores rojas sobre mesa blanca',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  altText?: string;

  @ApiProperty({
    description: 'Orden dentro de la galería',
    example: 0,
    default: 0,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  orden?: number;

  @ApiProperty({
    description: 'Indica si la imagen debe marcarse como principal',
    example: true,
    default: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPrimary?: boolean;

  @ApiProperty({
    description: 'Metadatos adicionales (por ejemplo dimensiones)',
    example: { width: 1024, height: 768 },
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

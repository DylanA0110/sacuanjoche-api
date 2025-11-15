import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class ForwardGeocodeQueryDto {
  @ApiProperty({
    description: 'Texto de búsqueda para geocodificar.',
    example: 'Centro comercial Managua',
  })
  @IsString()
  @MinLength(2)
  query!: string;

  @ApiProperty({
    required: false,
    description: 'Cantidad máxima de sugerencias (1-10).',
    minimum: 1,
    maximum: 10,
    example: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(10)
  limit?: number;

  @ApiProperty({
    required: false,
    description: 'Idioma preferido para los resultados (ISO 639-1).',
    example: 'es',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    required: false,
    description:
      'Filtro de países (ISO 3166-1) separados por coma. Por defecto se usa Nicaragua.',
    example: 'ni',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    required: false,
    description:
      'Tipos de lugar admitidos por Mapbox separados por coma (ej. poi,address).',
    example: 'poi,address',
  })
  @IsOptional()
  @IsString()
  types?: string;

  @ApiProperty({
    required: false,
    description:
      'Bounding box personalizada en formato minLng,minLat,maxLng,maxLat. Enviar vacío para deshabilitar la restricción.',
    example: '-86.40,12.03,-86.10,12.20',
  })
  @IsOptional()
  @IsString()
  bbox?: string;

  @ApiProperty({
    required: false,
    description: 'Latitud de referencia para priorizar resultados cercanos.',
    example: 12.136389,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  proximityLat?: number;

  @ApiProperty({
    required: false,
    description: 'Longitud de referencia para priorizar resultados cercanos.',
    example: -86.251389,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  proximityLng?: number;

  @ApiProperty({
    required: false,
    description: 'Forzar coincidencias aproximadas desde el primer intento.',
    example: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  fuzzyMatch?: boolean;

  @ApiProperty({
    required: false,
    description: 'Controlar el comportamiento de autocompletado de Mapbox.',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  autocomplete?: boolean;

  @ApiProperty({
    required: false,
    description:
      'Evita el segundo intento relajado cuando hay cero resultados.',
    example: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  skipRelaxed?: boolean;
}

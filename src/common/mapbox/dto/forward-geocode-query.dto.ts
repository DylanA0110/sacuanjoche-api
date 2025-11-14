import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
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
}

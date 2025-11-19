import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateArregloMediaSupabaseDto {
  @ApiProperty({
    description: 'Orden dentro de la galería',
    example: 2,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  orden?: number;

  @ApiProperty({
    description: 'Tipo de media (imagen, video, etc.)',
    example: 'imagen',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiProperty({
    description: 'Indica si la imagen debe marcarse como principal',
    example: true,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPrimary?: boolean;

  @ApiProperty({
    description: 'Texto alternativo para la imagen',
    example: 'Ramo de flores rojas',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  altText?: string;
}


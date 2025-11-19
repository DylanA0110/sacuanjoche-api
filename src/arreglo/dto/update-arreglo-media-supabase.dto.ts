import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
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
}


import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    default: 10,
    description: 'Número máximo de registros a devolver',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({
    default: 0,
    description: 'Número de registros a saltar (desplazamiento)',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}

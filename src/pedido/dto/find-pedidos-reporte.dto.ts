import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class FindPedidosReporteDto {
  @ApiPropertyOptional({
    description: 'Fecha de inicio del rango (formato ISO: YYYY-MM-DD). Si no se especifica, se usa la fecha de hoy',
    example: '2024-01-01',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida en formato YYYY-MM-DD' })
  @Type(() => String)
  fechaInicio?: string;

  @ApiPropertyOptional({
    description: 'Fecha de fin del rango (formato ISO: YYYY-MM-DD). Si no se especifica, se usa la fecha de hoy',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida en formato YYYY-MM-DD' })
  @Type(() => String)
  fechaFin?: string;
}


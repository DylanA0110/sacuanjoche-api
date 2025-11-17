import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  MaxLength,
  IsOptional,
  Min,
} from 'class-validator';
import { EstadoActivo } from '../../common/enums';

export class CreateFolioDto {
  @ApiProperty({
    description: 'Descripción del folio',
    example: 'Folio para facturas',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  descripcion: string;

  @ApiProperty({
    description: 'Estado del folio',
    example: EstadoActivo.ACTIVO,
    enum: EstadoActivo,
    default: EstadoActivo.ACTIVO,
    required: false,
  })
  @IsOptional()
  @IsEnum(EstadoActivo)
  activo?: EstadoActivo;

  @ApiProperty({
    description: 'Longitud del número de folio (cantidad de dígitos)',
    example: 4,
  })
  @IsNumber()
  @Min(1)
  longitud: number;

  @ApiProperty({
    description: 'Tipo de documento para el cual se usa este folio',
    example: 'FACTURA',
    maxLength: 20,
  })
  @IsString()
  @MaxLength(20)
  documento: string;

  @ApiProperty({
    description: 'Máscara para formatear el folio (ej: FAC-{0000})',
    example: 'FAC-{0000}',
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  mascara?: string;

  @ApiProperty({
    description: 'Valor inicial del folio',
    example: 1,
  })
  @IsNumber()
  @Min(0)
  valorInicial: number;

  @ApiProperty({
    description: 'Valor final del folio',
    example: 9999,
  })
  @IsNumber()
  @Min(1)
  valorFinal: number;

  @ApiProperty({
    description: 'Último valor usado del folio',
    example: 0,
  })
  @IsNumber()
  @Min(0)
  ultimoValor: number;
}


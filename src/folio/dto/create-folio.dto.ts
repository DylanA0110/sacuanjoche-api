import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  MinLength,
  Min,
  Max,
} from 'class-validator';
import { EstadoActivo } from '../../common/enums';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CreateFolioDto {
  @ApiProperty({
    description: 'Descripción del folio',
    example: 'Folio para facturas de venta',
    nullable: false,
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @MinLength(1)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(4)
  descripcion: string;

  @ApiProperty({
    description: 'Indica si el folio está activo',
    example: EstadoActivo.ACTIVO,
    enum: EstadoActivo,
    default: EstadoActivo.ACTIVO,
  })
  @IsEnum(EstadoActivo)
  @IsOptional()
  activo?: EstadoActivo;

  @ApiProperty({
    description: 'Longitud del número folio',
    example: 6,
    minimum: 1,
    maximum: 20,
  })
  @IsNumber()
  @Min(1)
  @Max(20)
  longitud: number;

  @ApiProperty({
    description: 'Tipo de documento para el folio',
    example: 'FACTURA',
    nullable: false,
    minLength: 1,
    maxLength: 20,
  })
  @IsString()
  @MinLength(1)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  documento: string;

  @ApiProperty({
    description: 'Máscara para formatear el folio',
    example: 'FAC-{0}',
    nullable: true,
    maxLength: 20,
  })
  @IsString()
  @IsOptional()
  @NoSqlInjection()
  mascara?: string;

  @ApiProperty({
    description: 'Valor inicial del folio',
    example: 1,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  valorInicial: number;

  @ApiProperty({
    description: 'Valor final del folio',
    example: 999999,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  valorFinal: number;

  @ApiProperty({
    description: 'Último valor utilizado del folio',
    example: 0,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  ultimoValor: number;
}


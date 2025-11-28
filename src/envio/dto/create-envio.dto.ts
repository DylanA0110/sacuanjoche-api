import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CreateEnvioDto {
  @ApiProperty({
    description: 'ID del pedido',
    example: 1,
  })
  @IsNumber()
  idPedido: number;

  @ApiProperty({
    description: 'ID del empleado responsable del envío',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  idEmpleado?: number;

  @ApiProperty({
    description: 'Estado del envío',
    example: 'Programado',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  estadoEnvio?: string;

  @ApiProperty({
    description: 'Fecha programada para el envío',
    example: '2024-01-15T09:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fechaProgramada?: string;

  @ApiProperty({
    description: 'Fecha de salida del envío',
    example: '2024-01-15T10:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fechaSalida?: string;

  @ApiProperty({
    description: 'Fecha de entrega del envío',
    example: '2024-01-15T14:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fechaEntrega?: string;

  @ApiProperty({
    description:
      'Latitud del origen (se calcula automáticamente con la configuración global).',
    example: 12.136389,
    required: false,
    readOnly: true,
  })
  @IsOptional()
  @IsNumber()
  origenLat?: number;

  @ApiProperty({
    description:
      'Longitud del origen (se calcula automáticamente con la configuración global).',
    example: -86.251389,
    required: false,
    readOnly: true,
  })
  @IsOptional()
  @IsNumber()
  origenLng?: number;

  @ApiProperty({
    description:
      'Latitud del destino (se calcula automáticamente desde la dirección del pedido).',
    example: 12.154321,
    required: false,
    readOnly: true,
  })
  @IsOptional()
  @IsNumber()
  destinoLat?: number;

  @ApiProperty({
    description:
      'Longitud del destino (se calcula automáticamente desde la dirección del pedido).',
    example: -86.289765,
    required: false,
    readOnly: true,
  })
  @IsOptional()
  @IsNumber()
  destinoLng?: number;

  @ApiProperty({
    description: 'Costo del envío',
    example: 10.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  costoEnvio?: number;

  @ApiProperty({
    description: 'Observaciones del envío',
    example: 'Entregar en horario de oficina',
    required: false,
  })
  @IsOptional()
  @IsString()
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(4)
  observaciones?: string;
}

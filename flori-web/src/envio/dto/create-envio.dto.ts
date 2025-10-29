import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, IsOptional, MaxLength } from 'class-validator';

export class CreateEnvioDto {
  @ApiProperty({
    description: 'ID del pedido',
    example: 1
  })
  @IsNumber()
  idPedido: number;

  @ApiProperty({
    description: 'ID del empleado responsable del envío',
    example: 1
  })
  @IsNumber()
  idEmpleado: number;

  @ApiProperty({
    description: 'Estado del envío',
    example: 'Programado',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  estadoEnvio: string;

  @ApiProperty({
    description: 'Fecha programada para el envío',
    example: '2024-01-15T09:00:00Z'
  })
  @IsDateString()
  fechaProgramada: string;

  @ApiProperty({
    description: 'Fecha de salida del envío',
    example: '2024-01-15T10:00:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  fechaSalida?: string;

  @ApiProperty({
    description: 'Fecha de entrega del envío',
    example: '2024-01-15T14:00:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  fechaEntrega?: string;

  @ApiProperty({
    description: 'Latitud del origen',
    example: 40.7128
  })
  @IsNumber()
  origenLat: number;

  @ApiProperty({
    description: 'Longitud del origen',
    example: -74.0060
  })
  @IsNumber()
  origenLng: number;

  @ApiProperty({
    description: 'Latitud del destino',
    example: 40.7589
  })
  @IsNumber()
  destinoLat: number;

  @ApiProperty({
    description: 'Longitud del destino',
    example: -73.9851
  })
  @IsNumber()
  destinoLng: number;

  @ApiProperty({
    description: 'Costo del envío',
    example: 10.00
  })
  @IsNumber()
  costoEnvio: number;

  @ApiProperty({
    description: 'Observaciones del envío',
    example: 'Entregar en horario de oficina',
    required: false
  })
  @IsOptional()
  @IsString()
  observaciones?: string;
}



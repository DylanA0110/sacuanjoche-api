import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, MaxLength, IsOptional } from 'class-validator';

export class CreateClienteDireccionDto {
  @ApiProperty({
    description: 'ID del cliente',
    example: 1
  })
  @IsNumber()
  idCliente: number;

  @ApiProperty({
    description: 'ID de la dirección',
    example: 1
  })
  @IsNumber()
  idDireccion: number;

  @ApiProperty({
    description: 'Etiqueta para identificar la dirección',
    example: 'Casa',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  etiqueta: string;

  @ApiProperty({
    description: 'Si es la dirección predeterminada',
    example: true,
    default: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  esPredeterminada?: boolean;

  @ApiProperty({
    description: 'Estado activo de la dirección del cliente',
    example: true,
    default: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}


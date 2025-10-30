import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, MaxLength, IsPhoneNumber } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Primer nombre del cliente',
    example: 'Juan',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  primerNombre: string;

  @ApiProperty({
    description: 'Primer apellido del cliente',
    example: 'Pérez',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  primerApellido: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '+1234567890',
    required: false,
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({
    description: 'Estado activo del cliente',
    example: true,
    default: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}


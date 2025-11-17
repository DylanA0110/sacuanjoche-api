import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, MaxLength, IsPhoneNumber } from 'class-validator';
import { ClienteEstado } from '../../common/enums';

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
    description: 'Estado del cliente',
    example: ClienteEstado.ACTIVO,
    enum: ClienteEstado,
    default: ClienteEstado.ACTIVO,
    required: false
  })
  @IsOptional()
  @IsEnum(ClienteEstado)
  estado?: ClienteEstado;
}


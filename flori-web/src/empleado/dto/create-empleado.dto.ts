import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsBoolean, MaxLength, IsOptional } from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty({
    description: 'Primer nombre del empleado',
    example: 'Juan',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  primerNombre: string;

  @ApiProperty({
    description: 'Primer apellido del empleado',
    example: 'Pérez',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  primerApellido: string;

  @ApiProperty({
    description: 'Segundo apellido del empleado',
    example: 'González',
    maxLength: 100,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  segundoApellido?: string;

  @ApiProperty({
    description: 'Sexo del empleado',
    example: 'M',
    maxLength: 10
  })
  @IsString()
  @MaxLength(10)
  sexo: string;

  @ApiProperty({
    description: 'Teléfono del empleado',
    example: '+1234567890',
    maxLength: 20
  })
  @IsString()
  @MaxLength(20)
  telefono: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del empleado',
    example: '1990-01-15'
  })
  @IsDateString()
  fechaNac: string;

  @ApiProperty({
    description: 'Estado activo del empleado',
    example: true,
    default: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}



import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty({
    description: 'Primer nombre del empleado',
    example: 'Juan',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  primerNombre: string;

  @ApiProperty({
    description: 'Segundo nombre del empleado',
    example: 'Carlos',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  segundoNombre?: string;

  @ApiProperty({
    description: 'Primer apellido del empleado',
    example: 'Pérez',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  primerApellido: string;

  @ApiProperty({
    description: 'Segundo apellido del empleado',
    example: 'García',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  segundoApellido?: string;

  @ApiProperty({
    description: 'Sexo del empleado (M/F)',
    example: 'M',
    enum: ['M', 'F'],
    required: false,
  })
  @IsString()
  @IsOptional()
  sexo?: string;

  @ApiProperty({
    description: 'Correo electrónico del empleado',
    example: 'juan.perez@empresa.com',
    maxLength: 100,
    required: false,
  })
  @IsEmail()
  @IsOptional()
  @MaxLength(100)
  correo?: string;

  @ApiProperty({
    description: 'Nombre de usuario del empleado',
    example: 'jperez',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  username?: string;

  @ApiProperty({
    description: 'Contraseña del empleado',
    example: 'Password123',
    maxLength: 255,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(255)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  contrasena?: string;

  @ApiProperty({
    description: 'Número de teléfono del empleado',
    example: '+1234567890',
    maxLength: 20,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del empleado',
    example: '1990-01-15',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  fechaDeNac?: Date;

  @ApiProperty({
    description: 'Indica si el empleado está aprobado',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  esAprobado?: boolean;

  @ApiProperty({
    description: 'ID del rol del empleado',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  rolId: number;
}

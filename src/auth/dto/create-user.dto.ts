import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoRandomAddress } from '../../common/validators/no-random-address.decorator';
import { NicaraguanPhone } from '../../common/validators/nicaraguan-phone.decorator';

class CreateUserClienteDto {
  @ApiProperty({ description: 'Primer nombre del cliente', example: 'Juan' })
  @IsString()
  @MinLength(1)
  @MaxLength(30, { message: 'El primer nombre no puede exceder 30 caracteres' })
  @AllowedCharacters()
  @NoSqlInjection()
  @NoExcessiveRepetition(4)
  @NoRandomString()
  primerNombre: string;

  @ApiProperty({
    description: 'Primer apellido del cliente',
    example: 'Pérez',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30, { message: 'El primer apellido no puede exceder 30 caracteres' })
  @AllowedCharacters()
  @NoSqlInjection()
  @NoExcessiveRepetition(4)
  @NoRandomString()
  primerApellido: string;

  @ApiPropertyOptional({
    description: 'RUC o documento del cliente',
    example: '1234567-8',
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  @NoSqlInjection()
  // No aplicamos NoRandomString ni NoExcessiveRepetition a RUC porque puede tener formato específico
  ruc?: string;

  @ApiPropertyOptional({
    description: 'Dirección del cliente',
    example: 'Av. Principal 123',
  })
  @IsString()
  @IsOptional()
  @MaxLength(300, { message: 'La dirección no puede exceder 300 caracteres' })
  @AllowedCharacters()
  @NoSqlInjection()
  @NoExcessiveRepetition(3)
  @NoRandomAddress()
  direccion?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto (formato: 505 seguido de 8 dígitos)',
    example: '50512345678',
  })
  @IsString()
  @IsOptional()
  @MaxLength(11)
  @NicaraguanPhone()
  @NoSqlInjection()
  // No aplicamos otras validaciones porque tiene formato específico
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales',
    example: 'Prefiere contacto por email',
  })
  @IsString()
  @IsOptional()
  @MaxLength(400, { message: 'Las notas no pueden exceder 400 caracteres' })
  @AllowedCharacters()
  @NoSqlInjection()
  @NoExcessiveRepetition(3)
  @NoRandomString()
  notas?: string;
}

export class CreateUserDto {
  @ApiProperty({ description: 'email', example: 'juanito32@gmail.com' })
  @IsString()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @MaxLength(100, { message: 'El email no puede exceder 100 caracteres' })
  @Matches(
    /^[a-zA-Z0-9._%+-]{6,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    {
      message: 'El correo debe tener al menos 6 caracteres antes del @'
    }
  )
  @NoSqlInjection()
  // No aplicamos NoRandomString ni NoExcessiveRepetition porque el email ya tiene validación estricta
  email: string;

  @ApiProperty({ description: 'contraseña', example: 'Juanito1234' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({ description: 'ID del cliente', example: 1 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  clienteId?: number;

  @ApiProperty({ description: 'ID del empleado', example: 1 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  empleadoId?: number;

  @ApiPropertyOptional({
    description: 'Datos para crear un nuevo cliente asociado al usuario',
    type: () => CreateUserClienteDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserClienteDto)
  clienteData?: CreateUserClienteDto;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';

export class CreateEmployeeUserDto {
  @ApiProperty({
    description: 'Email institucional del empleado',
    example: 'empleado@empresa.com',
  })
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

  @ApiProperty({
    description: 'Contraseña temporal para el empleado',
    example: 'ClaveTemporal123',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    description: 'ID del empleado previamente registrado',
    example: 7,
  })
  @IsInt()
  @IsPositive()
  empleadoId: number;
}

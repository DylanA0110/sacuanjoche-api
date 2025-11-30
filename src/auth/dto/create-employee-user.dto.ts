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
    description: 'Email del usuario',
    example: 'empleado@flori.com',
  })
  @IsString()
  @IsEmail()
  @NoSqlInjection()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Empleado1234',
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
    description: 'ID del empleado',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  empleadoId: number;
}


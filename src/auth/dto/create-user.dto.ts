import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'email', example: 'juanito32@gmail.com' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({ description: 'contraseña', example: 'Juanito1234' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  // @ApiProperty()
  // @IsString()
  // @MinLength(1)
  // @ApiProperty({description: 'fullname', example : 'Juanito Perez'})
  // fullName: string;

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
}

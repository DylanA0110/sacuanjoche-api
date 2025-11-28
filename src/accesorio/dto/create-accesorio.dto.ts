import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, MaxLength, IsOptional } from 'class-validator';
import { ArticuloEstado } from '../../common/enums';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CreateAccesorioDto {
  @ApiProperty({
    description: 'Descripción del accesorio',
    example: 'Cinta decorativa dorada',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(4)
  descripcion: string;

  @ApiProperty({
    description: 'Precio unitario del accesorio',
    example: 2.50
  })
  @IsNumber()
  precioUnitario: number;

  @ApiProperty({
    description: 'Estado del accesorio',
    example: ArticuloEstado.ACTIVO,
    enum: ArticuloEstado,
    default: ArticuloEstado.ACTIVO,
    required: false
  })
  @IsOptional()
  @IsEnum(ArticuloEstado)
  estado?: ArticuloEstado;

  @ApiProperty({
    description: 'Categoría del accesorio',
    example: 'Decoración',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  categoria: string;
}


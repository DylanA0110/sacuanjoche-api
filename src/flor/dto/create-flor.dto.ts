import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, MaxLength, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { ArticuloEstado } from '../../common/enums';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CreateFlorDto {
  @ApiProperty({
    description: 'Nombre de la flor',
    example: 'Rosa',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  nombre: string;

  @ApiProperty({
    description: 'Color de la flor',
    example: 'Rojo',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  color: string;
  @ApiProperty({
    description: 'Precio unitario de la flor',
    example: 100,
    type: Number
  })
  @IsNumber()
  @IsPositive()
  precioUnitario: number;

  @ApiProperty({
    description: 'Tipo de flor',
    example: 'Tropical',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  tipo: string;

  @ApiProperty({
    description: 'Estado de la flor',
    example: ArticuloEstado.ACTIVO,
    enum: ArticuloEstado,
    default: ArticuloEstado.ACTIVO,
    required: false
  })
  @IsOptional()
  @IsEnum(ArticuloEstado)
  estado?: ArticuloEstado;
}


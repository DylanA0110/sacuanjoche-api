import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CreateContactoEntregaDto {
  @ApiProperty({
    description: 'Nombre del contacto de entrega',
    example: 'María',
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
    description: 'Apellido del contacto de entrega',
    example: 'González',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  apellido: string;

  @ApiProperty({
    description: 'Teléfono del contacto de entrega',
    example: '+1234567890',
    maxLength: 20
  })
  @IsString()
  @MaxLength(20)
  @NoSqlInjection()
  telefono: string;
}


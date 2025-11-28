import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CreateRutaDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(4)
  nombre?: string;

  @IsOptional()
  @IsPositive()
  idEmpleado?: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  pedidoIds: number[];

  @IsOptional()
  @IsDateString()
  fechaProgramada?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  @NoSqlInjection()
  profile?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  origenLat?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  origenLng?: number;

  @IsOptional()
  @IsBoolean()
  roundTrip?: boolean;
}

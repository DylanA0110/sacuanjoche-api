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

export class CreateRutaDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
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

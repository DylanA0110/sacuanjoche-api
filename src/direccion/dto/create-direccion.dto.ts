import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsBoolean,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoRandomAddress } from '../../common/validators/no-random-address.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CreateDireccionDto {
  @ApiProperty({
    description: 'Dirección formateada completa',
    example: '123 Main St, New York, NY 10001, USA',
    required: false,
  })
  @IsOptional()
  @IsString()
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomAddress()
  @NoExcessiveRepetition(4)
  formattedAddress: string;

  @ApiProperty({
    description: 'País',
    example: 'USA',
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  country: string;

  @ApiProperty({
    description: 'Estado o provincia',
    example: 'New York',
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  stateProv: string;

  @ApiProperty({
    description: 'Ciudad',
    example: 'New York',
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  city: string;

  @ApiProperty({
    description: 'Barrio o colonia',
    example: 'Manhattan',
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  neighborhood?: string;

  @ApiProperty({
    description: 'Calle',
    example: 'Main Street',
    maxLength: 200,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomAddress()
  @NoExcessiveRepetition(4)
  street: string;

  @ApiProperty({
    description: 'Número de casa',
    example: '123',
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @NoSqlInjection()
  houseNumber: string;

  @ApiProperty({
    description: 'Código postal',
    example: '10001',
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @NoSqlInjection()
  postalCode: string;

  @ApiProperty({
    description: 'Referencia adicional',
    example: 'Cerca del parque central',
    required: false,
  })
  @IsOptional()
  @IsString()
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(4)
  referencia?: string;

  @ApiProperty({
    description: 'Latitud',
    example: 40.7128,
  })
  @Type(() => Number)
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'Longitud',
    example: -74.006,
  })
  @Type(() => Number)
  @IsNumber()
  lng: number;

  @ApiProperty({
    description: 'Proveedor de geocodificación',
    example: 'Google Maps',
    maxLength: 50,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @NoSqlInjection()
  provider: string;

  @ApiProperty({
    description: 'ID del lugar en el proveedor',
    example: 'ChIJd8BlQ2BZwokRAFUEcm_qrcA',
    maxLength: 200,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @NoSqlInjection()
  placeId?: string;

  @ApiProperty({
    description: 'Precisión de la geocodificación',
    example: 'ROOFTOP',
    maxLength: 50,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @NoSqlInjection()
  accuracy?: string;

  @ApiProperty({
    description: 'Datos de geolocalización adicionales',
    example: '{"accuracy": 10, "timestamp": 1640995200000}',
    required: false,
  })
  @IsOptional()
  @IsString()
  @NoSqlInjection()
  geolocation?: string;

  @ApiProperty({
    description: 'Estado activo de la dirección',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  activo?: boolean;
}

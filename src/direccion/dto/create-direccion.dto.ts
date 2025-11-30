import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsBoolean,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateDireccionDto {
  @ApiProperty({
    description: 'Dirección formateada completa',
    example: '123 Main St, New York, NY 10001, USA',
    required: false,
  })
  @IsOptional()
  @IsString()
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
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
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
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
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
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
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
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
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
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
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
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
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
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
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
  postalCode: string;

  @ApiProperty({
    description: 'Referencia adicional',
    example: 'Cerca del parque central',
    required: false,
  })
  @IsOptional()
  @IsString()
  // Sin validaciones personalizadas - campo opcional de referencia
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
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
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
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
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
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
  accuracy?: string;

  @ApiProperty({
    description: 'Datos de geolocalización adicionales',
    example: '{"accuracy": 10, "timestamp": 1640995200000}',
    required: false,
  })
  @IsOptional()
  @IsString()
  // Sin validaciones personalizadas - se rellena automáticamente desde Mapbox
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

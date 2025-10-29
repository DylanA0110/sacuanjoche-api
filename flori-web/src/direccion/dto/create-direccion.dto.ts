import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, MaxLength, IsOptional } from 'class-validator';

export class CreateDireccionDto {
  @ApiProperty({
    description: 'Dirección formateada completa',
    example: '123 Main St, New York, NY 10001, USA'
  })
  @IsString()
  formattedAddress: string;

  @ApiProperty({
    description: 'País',
    example: 'USA',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  country: string;

  @ApiProperty({
    description: 'Estado o provincia',
    example: 'New York',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  stateProv: string;

  @ApiProperty({
    description: 'Ciudad',
    example: 'New York',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiProperty({
    description: 'Barrio o colonia',
    example: 'Manhattan',
    maxLength: 100,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  neighborhood?: string;

  @ApiProperty({
    description: 'Calle',
    example: 'Main Street',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  street: string;

  @ApiProperty({
    description: 'Número de casa',
    example: '123',
    maxLength: 20
  })
  @IsString()
  @MaxLength(20)
  houseNumber: string;

  @ApiProperty({
    description: 'Código postal',
    example: '10001',
    maxLength: 20
  })
  @IsString()
  @MaxLength(20)
  postalCode: string;

  @ApiProperty({
    description: 'Referencia adicional',
    example: 'Cerca del parque central',
    required: false
  })
  @IsOptional()
  @IsString()
  referencia?: string;

  @ApiProperty({
    description: 'Latitud',
    example: 40.7128
  })
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'Longitud',
    example: -74.0060
  })
  @IsNumber()
  lng: number;

  @ApiProperty({
    description: 'Proveedor de geocodificación',
    example: 'Google Maps',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  provider: string;

  @ApiProperty({
    description: 'ID del lugar en el proveedor',
    example: 'ChIJd8BlQ2BZwokRAFUEcm_qrcA',
    maxLength: 200,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  placeId?: string;

  @ApiProperty({
    description: 'Precisión de la geocodificación',
    example: 'ROOFTOP',
    maxLength: 50,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  accuracy?: string;

  @ApiProperty({
    description: 'Datos de geolocalización adicionales',
    example: '{"accuracy": 10, "timestamp": 1640995200000}',
    required: false
  })
  @IsOptional()
  @IsString()
  geolocation?: string;

  @ApiProperty({
    description: 'Estado activo de la dirección',
    example: true,
    default: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}


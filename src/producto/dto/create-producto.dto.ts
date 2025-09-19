import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Rosa Roja',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombreProducto: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Hermosa rosa roja fresca para ocasiones especiales',
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/imagen-rosa.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  urlImagen?: string;

  @ApiProperty({
    description: 'Precio unitario del producto',
    example: 15.99,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precioUnitario: number;
}
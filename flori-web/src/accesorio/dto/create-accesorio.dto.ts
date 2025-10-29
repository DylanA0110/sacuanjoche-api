import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, MaxLength, IsOptional } from 'class-validator';

export class CreateAccesorioDto {
  @ApiProperty({
    description: 'Descripción del accesorio',
    example: 'Cinta decorativa dorada',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  descripcion: string;

  @ApiProperty({
    description: 'Precio unitario del accesorio',
    example: 2.50
  })
  @IsNumber()
  precioUnitario: number;

  @ApiProperty({
    description: 'Estado activo del accesorio',
    example: true,
    default: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @ApiProperty({
    description: 'Categoría del accesorio',
    example: 'Decoración',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  categoria: string;
}


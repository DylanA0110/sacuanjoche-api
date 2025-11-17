import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, MaxLength, IsOptional } from 'class-validator';
import { ArticuloEstado } from '../../common/enums/articulo-estado.enum';

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
  categoria: string;
}


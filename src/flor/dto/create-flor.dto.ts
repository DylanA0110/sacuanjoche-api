import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, MaxLength, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { ArticuloEstado } from '../../common/enums/articulo-estado.enum';

export class CreateFlorDto {
  @ApiProperty({
    description: 'Nombre de la flor',
    example: 'Rosa',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Color de la flor',
    example: 'Rojo',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
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


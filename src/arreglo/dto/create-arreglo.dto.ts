import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ArregloEstado } from '../../common/enums';

export class CreateArregloDto {
  @ApiProperty({
    description: 'ID de la forma de arreglo',
    example: 1,
  })
  @IsNumber()
  idFormaArreglo: number;

  @ApiProperty({
    description: 'Nombre del arreglo',
    example: 'Ramo de Rosas Rojas',
    maxLength: 200,
  })
  @IsString()
  @MaxLength(200)
  nombre: string;

  @ApiProperty({
    description: 'Descripción del arreglo',
    example: 'Hermoso ramo de rosas rojas para ocasiones especiales',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    description: 'Precio unitario del arreglo',
    example: 25.99,
  })
  @IsNumber()
  precioUnitario: number;

 
  @ApiProperty({
    description: 'Estado del arreglo',
    example: ArregloEstado.ACTIVO,
    enum: ArregloEstado,
    default: ArregloEstado.ACTIVO,
    required: false,
  })
  @IsOptional()
  @IsEnum(ArregloEstado)
  estado?: ArregloEstado;
}

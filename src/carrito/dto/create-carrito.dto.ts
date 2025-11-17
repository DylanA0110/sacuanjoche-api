import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsOptional } from 'class-validator';
import { CarritoEstado } from '../../common/enums/carrito-estado.enum';

export class CreateCarritoDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: 1
  })
  @IsNumber()
  idUser: number;

  @ApiProperty({
    description: 'Estado del carrito',
    example: CarritoEstado.ACTIVO,
    enum: CarritoEstado,
    default: CarritoEstado.ACTIVO,
    required: false
  })
  @IsOptional()
  @IsEnum(CarritoEstado)
  estado?: CarritoEstado;
}


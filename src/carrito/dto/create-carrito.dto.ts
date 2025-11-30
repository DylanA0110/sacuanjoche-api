import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { CarritoEstado } from '../../common/enums';

export class CreateCarritoDto {
  @ApiProperty({
    description: 'ID del usuario (UUID)',
    example: '0b5bd3d1-4ff3-4904-bec5-4ce9d2834d0b'
  })
  @IsUUID()
  idUser: string;

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


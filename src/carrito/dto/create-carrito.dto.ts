import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateCarritoDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: 1
  })
  @IsNumber()
  idUser: number;

  @ApiProperty({
    description: 'Estado activo del carrito',
    example: true,
    default: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}


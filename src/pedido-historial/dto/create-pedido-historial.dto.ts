import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreatePedidoHistorialDto {
  @ApiProperty({
    description: 'ID del pedido',
    example: 1
  })
  @IsNumber()
  idPedido: number;

  @ApiProperty({
    description: 'ID del empleado que realiza el cambio',
    example: 1
  })
  @IsNumber()
  idEmpleado: number;

  @ApiProperty({
    description: 'Estado del pedido',
    example: 'En Proceso',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  estado: string;

  @ApiProperty({
    description: 'Nota sobre el cambio de estado',
    example: 'Pedido confirmado y en preparación',
    required: false
  })
  @IsOptional()
  @IsString()
  nota?: string;
}




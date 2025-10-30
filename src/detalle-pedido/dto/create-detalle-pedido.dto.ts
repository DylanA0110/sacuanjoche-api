import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateDetallePedidoDto {
  @ApiProperty({
    description: 'ID del pedido',
    example: 1
  })
  @IsNumber()
  idPedido: number;

  @ApiProperty({
    description: 'ID del arreglo',
    example: 1
  })
  @IsNumber()
  idArreglo: number;

  @ApiProperty({
    description: 'Cantidad del arreglo',
    example: 2
  })
  @IsNumber()
  cantidad: number;

  @ApiProperty({
    description: 'Precio unitario del arreglo',
    example: 25.99
  })
  @IsNumber()
  precioUnitario: number;

  @ApiProperty({
    description: 'Subtotal (cantidad × precio unitario)',
    example: 51.98
  })
  @IsNumber()
  subtotal: number;
}



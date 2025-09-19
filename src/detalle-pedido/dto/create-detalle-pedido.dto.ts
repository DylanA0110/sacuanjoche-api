import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateDetallePedidoDto {
  @ApiProperty({
    description: 'ID del pedido',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  pedidoId: number;

  @ApiProperty({
    description: 'ID del producto',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  productoId: number;

  @ApiProperty({
    description: 'Cantidad del producto',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  cantidad: number;

  @ApiProperty({
    description: 'Precio unitario del producto al momento del pedido',
    example: 15.99,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  precioUnitario: number;
}

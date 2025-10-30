import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateCarritosArregloDto {
  @ApiProperty({
    description: 'ID del carrito',
    example: 1
  })
  @IsNumber()
  idCarrito: number;

  @ApiProperty({
    description: 'ID del arreglo',
    example: 1
  })
  @IsNumber()
  idArreglo: number;

  @ApiProperty({
    description: 'Cantidad del arreglo en el carrito',
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
    description: 'Total de la línea (cantidad × precio unitario)',
    example: 51.98
  })
  @IsNumber()
  totalLinea: number;
}


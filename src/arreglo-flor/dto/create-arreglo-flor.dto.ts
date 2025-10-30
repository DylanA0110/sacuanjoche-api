import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateArregloFlorDto {
  @ApiProperty({
    description: 'ID del arreglo',
    example: 1,
  })
  @IsNumber()
  idArreglo: number;

  @ApiProperty({
    description: 'ID de la flor',
    example: 1,
  })
  @IsNumber()
  idFlor: number;

  @ApiProperty({
    description: 'Cantidad de flores del tipo especificado',
    example: 12,
  })
  @IsNumber()
  cantidad: number;
}

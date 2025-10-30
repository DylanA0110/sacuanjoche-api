import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAccesoriosArregloDto {
  @ApiProperty({
    description: 'ID del accesorio',
    example: 1
  })
  @IsNumber()
  idAccesorio: number;

  @ApiProperty({
    description: 'ID del arreglo',
    example: 1
  })
  @IsNumber()
  idArreglo: number;
}


import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateFormaArregloDto {
  @ApiProperty({
    description: 'Descripción de la forma de arreglo',
    example: 'Ramo',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  descripcion: string;
}


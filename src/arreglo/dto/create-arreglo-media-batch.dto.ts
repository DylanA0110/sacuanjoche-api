import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateArregloMediaSimpleDto } from './create-arreglo-media-simple.dto';

export class CreateArregloMediaBatchDto {
  @ApiProperty({
    description: 'Array de imágenes a guardar',
    type: [CreateArregloMediaSimpleDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateArregloMediaSimpleDto)
  imagenes: CreateArregloMediaSimpleDto[];
}


import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class GenerateUploadUrlDto {
  @ApiProperty({
    description: 'Tipo de contenido (MIME) del archivo a subir',
    example: 'image/jpeg',
  })
  @IsString()
  @MaxLength(120)
  contentType: string;

  @ApiProperty({
    description: 'Tamaño en bytes del archivo',
    example: 524288,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  contentLength: number;

  @ApiProperty({
    description: 'Nombre de archivo sugerido (incluye extensión)',
    example: 'ramo-primavera.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  fileName?: string;

  @ApiProperty({
    description: 'Identificador del arreglo para organizar la carpeta',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  arregloId?: number;
}

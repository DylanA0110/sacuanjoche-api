import { ApiProperty } from '@nestjs/swagger';

export class MediaPublicDto {
  @ApiProperty({ description: 'ID de la imagen', example: 1 })
  idArregloMedia: number;

  @ApiProperty({ description: 'URL de la imagen', example: 'https://example.com/image.jpg' })
  url: string;

  @ApiProperty({ description: 'Orden de la imagen', example: 1 })
  orden: number;

  @ApiProperty({ description: 'Si es la imagen principal', example: true })
  isPrimary: boolean;

  @ApiProperty({ description: 'Texto alternativo', nullable: true, example: 'Bouquet romántico' })
  altText?: string;
}

export class FormaArregloPublicDto {
  @ApiProperty({ description: 'ID de la forma de arreglo', example: 1 })
  idFormaArreglo: number;

  @ApiProperty({ description: 'Descripción de la forma', example: 'Bouquet' })
  descripcion: string;
}

export class ArregloPublicResponseDto {
  @ApiProperty({ description: 'ID del arreglo', example: 1 })
  idArreglo: number;

  @ApiProperty({ description: 'Nombre del arreglo', example: 'Bouquet Romántico' })
  nombre: string;

  @ApiProperty({ description: 'Descripción del arreglo', nullable: true, example: 'Hermoso bouquet con rosas rojas' })
  descripcion: string | null;

  @ApiProperty({ description: 'Precio unitario', example: 150.00 })
  precioUnitario: number;

  @ApiProperty({ description: 'URL del arreglo', nullable: true })
  url: string | null;

  @ApiProperty({ description: 'Forma de arreglo', type: FormaArregloPublicDto, nullable: true })
  formaArreglo: FormaArregloPublicDto | null;

  @ApiProperty({ description: 'Imágenes del arreglo', type: [MediaPublicDto] })
  media: MediaPublicDto[];
}


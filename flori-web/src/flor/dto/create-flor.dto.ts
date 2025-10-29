import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, MaxLength } from 'class-validator';

export class CreateFlorDto {
  @ApiProperty({
    description: 'Nombre de la flor',
    example: 'Rosa',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Color de la flor',
    example: 'Rojo',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  color: string;

  @ApiProperty({
    description: 'Tipo de flor',
    example: 'Tropical',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  tipo: string;

  @ApiProperty({
    description: 'Estado activo de la flor',
    example: true,
    default: true,
    required: false
  })
  @IsBoolean()
  activo?: boolean;
}


import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUrl, Min, MaxLength } from 'class-validator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CreateArregloMediaSimpleDto {
  @ApiProperty({
    description: 'URL pública de Supabase',
    example:
      'https://sqedxfrmudmxyghvkpbp.supabase.co/storage/v1/object/public/CatalogoFloristeria/arreglos/1/imagen.jpg',
  })
  @IsUrl()
  @IsString()
  @NoSqlInjection()
  url: string;

  @ApiProperty({
    description: 'Orden dentro de la galería',
    example: 1,
    default: 0,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  orden?: number;

  @ApiProperty({
    description: 'Indica si la imagen debe marcarse como principal',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  isPrimary?: boolean;

  @ApiProperty({
    description: 'Texto alternativo para la imagen',
    example: 'Ramo de flores rojas',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(4)
  altText?: string;
}


import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUrl, Min, MaxLength } from 'class-validator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CreateArregloMediaSupabaseDto {
  @ApiProperty({
    description: 'ID del arreglo',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  idArreglo: number;

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
    description: 'Tipo de media (imagen, video, etc.)',
    example: 'imagen',
    default: 'imagen',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  tipo?: string;

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
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsNumber, Min, IsIn, MaxLength } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';

export class FindArreglosPublicDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Texto a buscar en el nombre, descripción o forma del arreglo',
    example: 'Bouquet romántico',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @NoSqlInjection()
  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  })
  q?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por ID de forma de arreglo',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  idFormaArreglo?: number;

  @ApiPropertyOptional({
    description: 'Filtrar por precio mínimo',
    example: 50.00,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precioMin?: number;

  @ApiPropertyOptional({
    description: 'Filtrar por precio máximo',
    example: 200.00,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precioMax?: number;

  @ApiPropertyOptional({
    description: 'Filtrar por IDs de flores (array)',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  flores?: number[];

  @ApiPropertyOptional({
    description: 'Ordenar por: nombre, precio, fechaCreacion',
    example: 'precio',
    enum: ['nombre', 'precio', 'fechaCreacion'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['nombre', 'precio', 'fechaCreacion'], {
    message: 'ordenarPor debe ser uno de: nombre, precio, fechaCreacion',
  })
  ordenarPor?: 'nombre' | 'precio' | 'fechaCreacion';

  @ApiPropertyOptional({
    description: 'Dirección del orden: ASC o DESC',
    example: 'ASC',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'], {
    message: 'orden debe ser ASC o DESC',
  })
  orden?: 'ASC' | 'DESC';
}


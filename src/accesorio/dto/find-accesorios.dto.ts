import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';

export class FindAccesoriosDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Texto a buscar en la descripción o categoría del accesorio',
    example: 'Cinta decorativa',
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
}

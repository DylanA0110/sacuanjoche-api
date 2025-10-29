import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, MaxLength, IsOptional } from 'class-validator';

export class CreateMetodoPagoDto {
  @ApiProperty({
    description: 'Descripción del método de pago',
    example: 'Tarjeta de crédito',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  descripcion: string;

  @ApiProperty({
    description: 'Estado activo del método de pago',
    example: true,
    default: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}


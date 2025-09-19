import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateFacturaDto {
  @ApiProperty({
    description: 'ID del pedido asociado a la factura',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  pedidoId: number;

  @ApiProperty({
    description: 'Monto total de la factura',
    example: 45.99,
    minimum: 0,
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  montoTotal?: number;

  @ApiProperty({
    description: 'Estado de la factura',
    example: 'pendiente',
    enum: ['pendiente', 'pagada', 'cancelada'],
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  estado?: string;

  @ApiProperty({
    description: 'ID del empleado que emite la factura',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  empleadoId?: number;

  @ApiProperty({
    description: 'Número de factura',
    example: 1001,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  numFactura?: number;

  @ApiProperty({
    description: 'Fecha de emisión de la factura',
    example: '2024-01-15T10:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  fechaEmision?: Date;

  @ApiProperty({
    description: 'Fecha de pago de la factura',
    example: '2024-01-16T14:30:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  fechaPago?: Date;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { FacturaEstado } from '../../common/enums/factura-estado.enum';

export class CreateFacturaDto {
  @ApiProperty({
    description: 'ID del pedido',
    example: 1
  })
  @IsNumber()
  idPedido: number;

  @ApiProperty({
    description: 'ID del empleado que emite la factura',
    example: 1
  })
  @IsNumber()
  idEmpleado: number;

  @ApiProperty({
    description: 'Número de factura',
    example: 'FAC-2024-001',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  numFactura: string;

  @ApiPropertyOptional({
    description: 'Estado de la factura',
    example: FacturaEstado.PENDIENTE,
    enum: FacturaEstado,
    default: FacturaEstado.PENDIENTE,
  })
  @IsOptional()
  @IsEnum(FacturaEstado, { message: 'El estado debe ser un estado válido de factura' })
  estado?: FacturaEstado;

  @ApiProperty({
    description: 'Monto total de la factura',
    example: 150.00
  })
  @IsNumber()
  montoTotal: number;
}




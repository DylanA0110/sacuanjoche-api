import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, MaxLength } from 'class-validator';

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

  @ApiProperty({
    description: 'Estado de la factura',
    example: 'Emitida',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  estado: string;

  @ApiProperty({
    description: 'Monto total de la factura',
    example: 150.00
  })
  @IsNumber()
  montoTotal: number;
}




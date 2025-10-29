import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreatePagoDto {
  @ApiProperty({
    description: 'ID del pedido',
    example: 1
  })
  @IsNumber()
  idPedido: number;

  @ApiProperty({
    description: 'ID del método de pago',
    example: 1
  })
  @IsNumber()
  idMetodoPago: number;

  @ApiProperty({
    description: 'Monto del pago',
    example: 150.00
  })
  @IsNumber()
  monto: number;

  @ApiProperty({
    description: 'Estado del pago',
    example: 'Pendiente',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  estado: string;

  @ApiProperty({
    description: 'Referencia del pago',
    example: 'PAY-123456789',
    maxLength: 200,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  referencia?: string;

  @ApiProperty({
    description: 'Gateway de pago utilizado',
    example: 'PayPal',
    maxLength: 100,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  gateway?: string;

  @ApiProperty({
    description: 'ID del pago en el gateway',
    example: 'PAYID-123456789',
    maxLength: 200,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  idGateway?: string;

  @ApiProperty({
    description: 'URL externa de pago',
    example: 'https://paypal.com/pay/123456789',
    required: false
  })
  @IsOptional()
  @IsString()
  paymentUrlExt?: string;

  @ApiProperty({
    description: 'Payload crudo del gateway',
    example: '{"id": "PAYID-123456789", "status": "COMPLETED"}',
    required: false
  })
  @IsOptional()
  @IsString()
  rawPayload?: string;
}



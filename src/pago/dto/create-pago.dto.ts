import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, MaxLength, IsEnum } from 'class-validator';
import { PagoEstado } from '../../common/enums';

export class CreatePagoDto {
  @ApiProperty({
    description: 'ID del pedido (opcional, puede ser null si el pago se crea antes del pedido)',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  idPedido?: number;

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

  @ApiPropertyOptional({
    description: 'Estado del pago',
    example: PagoEstado.PENDIENTE,
    enum: PagoEstado,
    default: PagoEstado.PENDIENTE,
  })
  @IsOptional()
  @IsEnum(PagoEstado, { message: 'El estado debe ser un estado válido de pago' })
  estado?: PagoEstado;

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
    description: 'URL del enlace de pago',
    example: 'https://paypal.com/pay/123456789',
    required: false
  })
  @IsOptional()
  @IsString()
  paymentLinkUrl?: string;

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



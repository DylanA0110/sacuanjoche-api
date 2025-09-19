import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreatePedidoDto {
  @ApiProperty({
    description: 'ID del cliente que realiza el pedido',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @ApiProperty({
    description: 'Descripción del pedido',
    example: 'Pedido de flores para cumpleaños',
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'Fecha de entrega del pedido',
    example: '2024-12-25T10:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  fechaEntrega?: Date;

  @ApiProperty({
    description: 'Estado del pedido',
    example: 'pendiente',
    enum: ['pendiente', 'confirmado', 'en_proceso', 'enviado', 'entregado', 'cancelado'],
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  estado?: string;

  @ApiProperty({
    description: 'Método de pago',
    example: 'efectivo',
    enum: ['efectivo', 'tarjeta', 'transferencia'],
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  metodoPago?: string;

  @ApiProperty({
    description: 'Total del pedido',
    example: 45.99,
    minimum: 0,
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  total?: number;

  @ApiProperty({
    description: 'Dirección de entrega',
    example: 'Calle 123, Ciudad, País',
    maxLength: 200,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  direccionEntrega?: string;

  @ApiProperty({
    description: 'Latitud de la dirección de entrega',
    example: 40.7128,
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 6 })
  @IsOptional()
  latitud?: number;

  @ApiProperty({
    description: 'Longitud de la dirección de entrega',
    example: -74.0060,
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 6 })
  @IsOptional()
  longitud?: number;

  @ApiProperty({
    description: 'Nombre del destinatario',
    example: 'María',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  nombreDestinatario?: string;

  @ApiProperty({
    description: 'Apellido del destinatario',
    example: 'González',
    maxLength: 50,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  apellidoDestinatario?: string;

  @ApiProperty({
    description: 'Teléfono del destinatario',
    example: '+1234567890',
    maxLength: 20,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  telefonoDestinatario?: string;

  @ApiProperty({
    description: 'ID del repartidor asignado',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  repartidorId?: number;
}

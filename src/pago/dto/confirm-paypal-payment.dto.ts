import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmPayPalPaymentDto {
  @ApiProperty({
    description: 'ID de la orden de PayPal (obtenido de la respuesta de PayPal después de la aprobación)',
    example: '5O190127TN364715T',
  })
  @IsString({ message: 'El orderId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El orderId es requerido y no puede estar vacío' })
  orderId: string;
}


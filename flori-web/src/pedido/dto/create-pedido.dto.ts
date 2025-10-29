import { IsNotEmpty, IsNumber, IsString, IsDateString, IsDecimal, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePedidoDto {
  @ApiProperty({
    description: 'ID del empleado que maneja el pedido',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID del empleado es requerido' })
  @IsNumber({}, { message: 'El ID del empleado debe ser un número' })
  idEmpleado: number;

  @ApiProperty({
    description: 'ID del cliente que realiza el pedido',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  idCliente: number;

  @ApiProperty({
    description: 'ID de la dirección de entrega',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID de la dirección es requerido' })
  @IsNumber({}, { message: 'El ID de la dirección debe ser un número' })
  idDireccion: number;

  @ApiProperty({
    description: 'ID del contacto de entrega',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID del contacto de entrega es requerido' })
  @IsNumber({}, { message: 'El ID del contacto de entrega debe ser un número' })
  idContactoEntrega: number;

  @ApiProperty({
    description: 'Total de productos en el pedido',
    example: 150.50,
  })
  @IsNotEmpty({ message: 'El total de productos es requerido' })
  @IsNumber({}, { message: 'El total de productos debe ser un número' })
  @Min(0, { message: 'El total de productos debe ser mayor o igual a 0' })
  totalProductos: number;

  @ApiProperty({
    description: 'Fecha estimada de entrega',
    example: '2024-12-25T10:00:00.000Z',
  })
  @IsNotEmpty({ message: 'La fecha de entrega estimada es requerida' })
  @IsDateString({}, { message: 'La fecha de entrega estimada debe ser una fecha válida' })
  fechaEntregaEstimada: Date;

  @ApiProperty({
    description: 'Dirección de entrega en texto',
    example: 'Calle 123 #45-67, Barrio Centro, Ciudad',
  })
  @IsNotEmpty({ message: 'La dirección de entrega es requerida' })
  @IsString({ message: 'La dirección de entrega debe ser un texto' })
  direccionTxt: string;

  @ApiProperty({
    description: 'Costo de envío del pedido',
    example: 25.00,
  })
  @IsNotEmpty({ message: 'El costo de envío es requerido' })
  @IsNumber({}, { message: 'El costo de envío debe ser un número' })
  @Min(0, { message: 'El costo de envío debe ser mayor o igual a 0' })
  costoEnvio: number;

  @ApiProperty({
    description: 'Total del pedido (productos + envío)',
    example: 175.50,
  })
  @IsNotEmpty({ message: 'El total del pedido es requerido' })
  @IsNumber({}, { message: 'El total del pedido debe ser un número' })
  @Min(0, { message: 'El total del pedido debe ser mayor o igual a 0' })
  totalPedido: number;
}

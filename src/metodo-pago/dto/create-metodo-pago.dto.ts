import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional, IsEnum, IsArray, ArrayMinSize } from 'class-validator';
import { MetodoPagoTipo, PedidoCanal, MetodoPagoEstado } from '../../common/enums';

export class CreateMetodoPagoDto {
  @ApiProperty({
    description: 'Descripción del método de pago',
    example: 'PayPal',
    maxLength: 200
  })
  @IsString()
  @MaxLength(200)
  descripcion: string;

  @ApiProperty({
    description: 'Tipo de método de pago',
    example: MetodoPagoTipo.ONLINE,
    enum: MetodoPagoTipo,
    default: MetodoPagoTipo.MIXTO,
    required: false,
  })
  @IsOptional()
  @IsEnum(MetodoPagoTipo, { message: 'El tipo debe ser uno de los valores válidos' })
  tipo?: MetodoPagoTipo;

  @ApiProperty({
    description: 'Canales donde está disponible este método de pago',
    example: [PedidoCanal.WEB],
    enum: PedidoCanal,
    isArray: true,
    default: [PedidoCanal.WEB, PedidoCanal.INTERNO],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'Debe especificar al menos un canal disponible' })
  @IsEnum(PedidoCanal, { each: true, message: 'Cada canal debe ser "web" o "interno"' })
  canalesDisponibles?: PedidoCanal[];

  @ApiProperty({
    description: 'Estado del método de pago',
    example: MetodoPagoEstado.ACTIVO,
    enum: MetodoPagoEstado,
    default: MetodoPagoEstado.ACTIVO,
    required: false
  })
  @IsOptional()
  @IsEnum(MetodoPagoEstado, { message: 'El estado debe ser "activo" o "inactivo"' })
  estado?: MetodoPagoEstado;
}


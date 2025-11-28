import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { PedidoEstado } from '../../common/enums';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CreatePedidoHistorialDto {
  @ApiProperty({
    description: 'ID del pedido',
    example: 1
  })
  @IsNumber()
  idPedido: number;

  @ApiProperty({
    description: 'ID del empleado que realiza el cambio',
    example: 1
  })
  @IsNumber()
  idEmpleado: number;

  @ApiPropertyOptional({
    description: 'Estado anterior del pedido (opcional, se puede inferir del pedido actual)',
    example: PedidoEstado.PENDIENTE,
    enum: PedidoEstado,
  })
  @IsOptional()
  @IsEnum(PedidoEstado, { message: 'El estado anterior debe ser un estado válido del pedido' })
  estadoAnterior?: PedidoEstado | null;

  @ApiProperty({
    description: 'Nuevo estado del pedido',
    example: PedidoEstado.PROCESANDO,
    enum: PedidoEstado,
  })
  @IsEnum(PedidoEstado, { message: 'El estado nuevo debe ser un estado válido del pedido' })
  estadoNuevo: PedidoEstado;

  @ApiPropertyOptional({
    description: 'Nota sobre el cambio de estado',
    example: 'Pedido confirmado y en preparación',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(4)
  nota?: string;
}




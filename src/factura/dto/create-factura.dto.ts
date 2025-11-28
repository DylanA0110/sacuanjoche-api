import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { FacturaEstado } from '../../common/enums';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoRandomString } from '../../common/validators/no-random-string.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

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
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomString()
  @NoExcessiveRepetition(3)
  numFactura: string;

  
  @ApiProperty({
    description: 'ID del folio',
    example: 1
  })
  @IsNumber()
  idFolio: number;

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




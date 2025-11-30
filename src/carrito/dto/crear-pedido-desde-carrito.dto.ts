import { IsNotEmpty, IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AllowedCharacters } from '../../common/validators/allowed-characters.decorator';
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';
import { NoRandomAddress } from '../../common/validators/no-random-address.decorator';
import { NoExcessiveRepetition } from '../../common/validators/no-excessive-repetition.decorator';

export class CrearPedidoDesdeCarritoDto {
  @ApiPropertyOptional({
    description: 'ID del empleado que maneja el pedido (opcional para pedidos desde la web)',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El ID del empleado debe ser un número' })
  idEmpleado?: number;

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
    description: 'ID del folio',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID del folio es requerido' })
  @IsNumber({}, { message: 'El ID del folio debe ser un número' })
  idFolio: number;

  @ApiPropertyOptional({
    description: 'Fecha estimada de entrega',
    example: '2024-12-25T10:00:00.000Z',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de entrega estimada debe ser una fecha válida' })
  fechaEntregaEstimada?: Date;

  @ApiProperty({
    description: 'Dirección de entrega en texto',
    example: 'Calle 123 #45-67, Barrio Centro, Ciudad',
  })
  @IsNotEmpty({ message: 'La dirección de entrega es requerida' })
  @IsString({ message: 'La dirección de entrega debe ser un texto' })
  @AllowedCharacters()
  @NoSqlInjection()
  @NoRandomAddress()
  @NoExcessiveRepetition(4)
  direccionTxt: string;
}


import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearFacturaDesdePedidoDto {
  @ApiProperty({
    description: 'ID del empleado que emite la factura',
    example: 1,
    type: Number,
  })
  @IsNotEmpty({ message: 'El idEmpleado es requerido' })
  @IsNumber({}, { message: 'El idEmpleado debe ser un número' })
  @Type(() => Number)
  idEmpleado: number;
}


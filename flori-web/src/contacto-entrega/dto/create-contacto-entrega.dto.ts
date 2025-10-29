import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateContactoEntregaDto {
  @ApiProperty({
    description: 'Nombre del contacto de entrega',
    example: 'María',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Apellido del contacto de entrega',
    example: 'González',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  apellido: string;

  @ApiProperty({
    description: 'Teléfono del contacto de entrega',
    example: '+1234567890',
    maxLength: 20
  })
  @IsString()
  @MaxLength(20)
  telefono: string;
}


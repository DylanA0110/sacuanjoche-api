import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nombre completo del cliente',
    example: 'Juan Pérez',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombreCliente: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '+1234567890',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefono: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'juan.perez@email.com',
    maxLength: 100,
    required: false,
  })
  @IsEmail()
  @IsOptional()
  @MaxLength(100)
  email?: string;

  @ApiProperty({
    description: 'Contraseña del cliente',
    example: 'password123',
    maxLength: 255,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(255)
  contrasena?: string;
}

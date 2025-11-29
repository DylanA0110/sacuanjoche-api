import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteDireccionService } from './cliente-direccion.service';
import { ClienteDireccionController } from './cliente-direccion.controller';
import { ClienteDireccion } from './entities/cliente-direccion.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteDireccion, Cliente, Direccion]), AuthModule],
  controllers: [ClienteDireccionController],
  providers: [ClienteDireccionService],
  exports: [ClienteDireccionService],
})
export class ClienteDireccionModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteDireccionService } from './cliente-direccion.service';
import { ClienteDireccionController } from './cliente-direccion.controller';
import { ClienteDireccion } from './entities/cliente-direccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteDireccion])],
  controllers: [ClienteDireccionController],
  providers: [ClienteDireccionService],
  exports: [ClienteDireccionService],
})
export class ClienteDireccionModule {}




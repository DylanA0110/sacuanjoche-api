import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { Envio } from './entities/envio.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { MapboxModule } from 'src/common/mapbox/mapbox.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Envio, Pedido, Empleado]), MapboxModule, AuthModule],
  controllers: [EnvioController],
  providers: [EnvioService],
  exports: [EnvioService],
})
export class EnvioModule {}

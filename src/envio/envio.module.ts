import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { Envio } from './entities/envio.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Envio, Pedido, Empleado])],
  controllers: [EnvioController],
  providers: [EnvioService],
  exports: [EnvioService],
})
export class EnvioModule {}

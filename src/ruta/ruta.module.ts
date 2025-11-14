import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutaService } from './ruta.service';
import { RutaController } from './ruta.controller';
import { Ruta } from './entities/ruta.entity';
import { RutaPedido } from './entities/ruta-pedido.entity';
import { Pedido } from '../pedido/entities/pedido.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { MapboxModule } from '../common/mapbox/mapbox.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ruta, RutaPedido, Pedido, Empleado]),
    MapboxModule,
  ],
  controllers: [RutaController],
  providers: [RutaService],
  exports: [RutaService],
})
export class RutaModule {}

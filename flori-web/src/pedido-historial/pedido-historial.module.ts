import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoHistorialService } from './pedido-historial.service';
import { PedidoHistorialController } from './pedido-historial.controller';
import { PedidoHistorial } from './entities/pedido-historial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoHistorial])],
  controllers: [PedidoHistorialController],
  providers: [PedidoHistorialService],
  exports: [PedidoHistorialService],
})
export class PedidoHistorialModule {}



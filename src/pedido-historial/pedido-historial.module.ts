import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoHistorialService } from './pedido-historial.service';
import { PedidoHistorialController } from './pedido-historial.controller';
import { PedidoHistorial } from './entities/pedido-historial.entity';
import { Pedido } from '../pedido/entities/pedido.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoHistorial, Pedido, Empleado]),
    AuthModule,
  ],
  controllers: [PedidoHistorialController],
  providers: [PedidoHistorialService],
  exports: [PedidoHistorialService],
})
export class PedidoHistorialModule {}




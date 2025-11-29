import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedidoService } from './detalle-pedido.service';
import { DetallePedidoController } from './detalle-pedido.controller';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Arreglo } from 'src/arreglo/entities/arreglo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido, Pedido, Arreglo]), AuthModule],
  controllers: [DetallePedidoController],
  providers: [DetallePedidoService],
  exports: [DetallePedidoService],
})
export class DetallePedidoModule {}

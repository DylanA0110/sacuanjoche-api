import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Pedido } from './entities/pedido.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { ContactoEntrega } from 'src/contacto-entrega/entities/contacto-entrega.entity';
import { Pago } from 'src/pago/entities/pago.entity';
import { PedidoHistorialModule } from 'src/pedido-historial/pedido-historial.module';
import { FolioModule } from 'src/folio/folio.module';
import { DetallePedido } from 'src/detalle-pedido/entities/detalle-pedido.entity';
import { Folio } from 'src/folio/entities/folio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      Cliente,
      Empleado,
      Direccion,
      ContactoEntrega,
      Pago,
      DetallePedido,
      Folio,
    ]),
    PedidoHistorialModule,
    FolioModule,
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}

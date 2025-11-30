import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { Carrito } from './entities/carrito.entity';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Pago } from 'src/pago/entities/pago.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { ContactoEntrega } from 'src/contacto-entrega/entities/contacto-entrega.entity';
import { DetallePedido } from 'src/detalle-pedido/entities/detalle-pedido.entity';
import { CarritosArreglo } from 'src/carritos-arreglo/entities/carritos-arreglo.entity';
import { Folio } from 'src/folio/entities/folio.entity';
import { DetallePedidoModule } from 'src/detalle-pedido/detalle-pedido.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Carrito,
      User,
      Pago,
      Pedido,
      Empleado,
      Cliente,
      Direccion,
      ContactoEntrega,
      DetallePedido,
      CarritosArreglo,
      Folio,
    ]),
    AuthModule,
    DetallePedidoModule,
    NotificationsModule,
  ],
  controllers: [CarritoController],
  providers: [CarritoService],
  exports: [CarritoService],
})
export class CarritoModule {}

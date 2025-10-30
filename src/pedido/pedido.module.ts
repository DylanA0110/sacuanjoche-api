import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Pedido } from './entities/pedido.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Direccion } from 'src/direccion/entities/direccion.entity';
import { ContactoEntrega } from 'src/contacto-entrega/entities/contacto-entrega.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      Cliente,
      Empleado,
      Direccion,
      ContactoEntrega,
    ]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}

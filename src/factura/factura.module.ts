import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { Factura } from './entities/factura.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { DetallePedido } from 'src/detalle-pedido/entities/detalle-pedido.entity';
import { FacturaDetalle } from 'src/factura-detalle/entities/factura-detalle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Factura,
      Pedido,
      Empleado,
      DetallePedido,
      FacturaDetalle,
    ]),
  ],
  controllers: [FacturaController],
  providers: [FacturaService],
  exports: [FacturaService],
})
export class FacturaModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrinterModule } from '../printer/printer.module';
import { FacturaModule } from '../factura/factura.module';
import { PedidoModule } from '../pedido/pedido.module';
import { Pedido } from '../pedido/entities/pedido.entity';
import { FacturaReport } from './report/factura.report';
import { OrdenTrabajoReport } from './report/orden-trabajo.report';
import { PedidosReport } from './report/pedidos.report';
import { FacturasReport } from './report/facturas.report';
import { ArreglosReport } from './report/arreglos.report';
import { Factura } from '../factura/entities/factura.entity';
import { Arreglo } from '../arreglo/entities/arreglo.entity';
import { DetallePedido } from '../detalle-pedido/entities/detalle-pedido.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrinterModule,
    FacturaModule,
    PedidoModule,
    TypeOrmModule.forFeature([Pedido, Factura, Arreglo, DetallePedido]),
    AuthModule,
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService,
    FacturaReport,
    OrdenTrabajoReport,
    PedidosReport,
    FacturasReport,
    ArreglosReport,
  ],
  exports: [ReportsService],
})
export class ReportsModule {}


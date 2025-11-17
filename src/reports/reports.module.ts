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

@Module({
  imports: [
    PrinterModule,
    FacturaModule,
    PedidoModule,
    TypeOrmModule.forFeature([Pedido]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, FacturaReport, OrdenTrabajoReport],
  exports: [ReportsService],
})
export class ReportsModule {}


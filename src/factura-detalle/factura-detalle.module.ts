import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaDetalleService } from './factura-detalle.service';
import { FacturaDetalleController } from './factura-detalle.controller';
import { FacturaDetalle } from './entities/factura-detalle.entity';
import { Factura } from '../factura/entities/factura.entity';
import { Arreglo } from '../arreglo/entities/arreglo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FacturaDetalle, Factura, Arreglo]),
  ],
  controllers: [FacturaDetalleController],
  providers: [FacturaDetalleService],
  exports: [FacturaDetalleService],
})
export class FacturaDetalleModule {}


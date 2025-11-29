import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { Pago } from './entities/pago.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { MetodoPago } from 'src/metodo-pago/entities/metodo-pago.entity';
import { PayPalService } from './paypal/paypal.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, Pedido, MetodoPago]), AuthModule],
  controllers: [PagoController],
  providers: [PagoService, PayPalService],
  exports: [PagoService],
})
export class PagoModule {}

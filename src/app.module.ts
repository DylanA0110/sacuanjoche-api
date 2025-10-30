import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesorioModule } from './accesorio/accesorio.module';
import { AccesoriosArregloModule } from './accesorios-arreglo/accesorios-arreglo.module';
import { ArregloModule } from './arreglo/arreglo.module';
import { ArregloFlorModule } from './arreglo-flor/arreglo-flor.module';
import { AuthModule } from './auth/auth.module';
import { CarritoModule } from './carrito/carrito.module';
import { CarritosArregloModule } from './carritos-arreglo/carritos-arreglo.module';
import { ClienteModule } from './cliente/cliente.module';
import { ClienteDireccionModule } from './cliente-direccion/cliente-direccion.module';
import { ContactoEntregaModule } from './contacto-entrega/contacto-entrega.module';
import { DetallePedidoModule } from './detalle-pedido/detalle-pedido.module';
import { DireccionModule } from './direccion/direccion.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { EnvioModule } from './envio/envio.module';
import { FacturaModule } from './factura/factura.module';
import { FlorModule } from './flor/flor.module';
import { FormaArregloModule } from './forma-arreglo/forma-arreglo.module';
import { MetodoPagoModule } from './metodo-pago/metodo-pago.module';
import { PagoModule } from './pago/pago.module';
import { PedidoModule } from './pedido/pedido.module';
import { PedidoHistorialModule } from './pedido-historial/pedido-historial.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl:
          process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AccesorioModule,
    AccesoriosArregloModule,
    ArregloModule,
    ArregloFlorModule,
    AuthModule,
    CarritoModule,
    CarritosArregloModule,
    ClienteModule,
    ClienteDireccionModule,
    ContactoEntregaModule,
    DetallePedidoModule,
    DireccionModule,
    EmpleadoModule,
    EnvioModule,
    FacturaModule,
    FlorModule,
    FormaArregloModule,
    MetodoPagoModule,
    PagoModule,
    PedidoModule,
    PedidoHistorialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('STAGE') !== 'prod',
        ssl: configService.get<string>('STAGE') === 'prod',
        extra: {
          ssl:
            configService.get<string>('STAGE') === 'prod'
              ? { rejectUnauthorized: false }
              : null,
        },
      }),
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

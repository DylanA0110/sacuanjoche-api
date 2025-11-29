import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritosArregloService } from './carritos-arreglo.service';
import { CarritosArregloController } from './carritos-arreglo.controller';
import { CarritosArreglo } from './entities/carritos-arreglo.entity';
import { Carrito } from 'src/carrito/entities/carrito.entity';
import { Arreglo } from 'src/arreglo/entities/arreglo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarritosArreglo, Carrito, Arreglo]), AuthModule],
  controllers: [CarritosArregloController],
  providers: [CarritosArregloService],
  exports: [CarritosArregloService],
})
export class CarritosArregloModule {}

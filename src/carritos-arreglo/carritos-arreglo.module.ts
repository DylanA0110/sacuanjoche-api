import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritosArregloService } from './carritos-arreglo.service';
import { CarritosArregloController } from './carritos-arreglo.controller';
import { CarritosArreglo } from './entities/carritos-arreglo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarritosArreglo])],
  controllers: [CarritosArregloController],
  providers: [CarritosArregloService],
  exports: [CarritosArregloService],
})
export class CarritosArregloModule {}




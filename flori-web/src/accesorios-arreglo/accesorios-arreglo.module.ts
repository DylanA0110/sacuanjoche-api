import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesoriosArregloService } from './accesorios-arreglo.service';
import { AccesoriosArregloController } from './accesorios-arreglo.controller';
import { AccesoriosArreglo } from './entities/accesorios-arreglo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccesoriosArreglo])],
  controllers: [AccesoriosArregloController],
  providers: [AccesoriosArregloService],
  exports: [AccesoriosArregloService],
})
export class AccesoriosArregloModule {}



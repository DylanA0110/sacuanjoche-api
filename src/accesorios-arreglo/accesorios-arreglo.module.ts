import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesoriosArregloService } from './accesorios-arreglo.service';
import { AccesoriosArregloController } from './accesorios-arreglo.controller';
import { AccesoriosArreglo } from './entities/accesorios-arreglo.entity';
import { Accesorio } from 'src/accesorio/entities/accesorio.entity';
import { Arreglo } from 'src/arreglo/entities/arreglo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccesoriosArreglo, Accesorio, Arreglo])],
  controllers: [AccesoriosArregloController],
  providers: [AccesoriosArregloService],
  exports: [AccesoriosArregloService],
})
export class AccesoriosArregloModule {}

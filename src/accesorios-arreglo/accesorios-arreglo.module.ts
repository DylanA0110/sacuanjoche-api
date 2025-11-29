import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesoriosArregloService } from './accesorios-arreglo.service';
import { AccesoriosArregloController } from './accesorios-arreglo.controller';
import { AccesoriosArreglo } from './entities/accesorios-arreglo.entity';
import { Accesorio } from 'src/accesorio/entities/accesorio.entity';
import { Arreglo } from 'src/arreglo/entities/arreglo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccesoriosArreglo, Accesorio, Arreglo]), AuthModule],
  controllers: [AccesoriosArregloController],
  providers: [AccesoriosArregloService],
  exports: [AccesoriosArregloService],
})
export class AccesoriosArregloModule {}

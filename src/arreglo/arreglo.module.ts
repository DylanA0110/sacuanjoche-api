import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArregloService } from './arreglo.service';
import { ArregloController } from './arreglo.controller';
import { Arreglo } from './entities/arreglo.entity';
import { FormaArreglo } from 'src/forma-arreglo/entities/forma-arreglo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Arreglo, FormaArreglo])],
  controllers: [ArregloController],
  providers: [ArregloService],
  exports: [ArregloService],
})
export class ArregloModule {}

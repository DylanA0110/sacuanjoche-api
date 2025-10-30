import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArregloService } from './arreglo.service';
import { ArregloController } from './arreglo.controller';
import { Arreglo } from './entities/arreglo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Arreglo])],
  controllers: [ArregloController],
  providers: [ArregloService],
  exports: [ArregloService],
})
export class ArregloModule {}




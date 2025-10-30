import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArregloFlorService } from './arreglo-flor.service';
import { ArregloFlorController } from './arreglo-flor.controller';
import { ArregloFlor } from './entities/arreglo-flor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArregloFlor])],
  controllers: [ArregloFlorController],
  providers: [ArregloFlorService],
  exports: [ArregloFlorService],
})
export class ArregloFlorModule {}




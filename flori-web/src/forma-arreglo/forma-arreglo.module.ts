import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormaArregloService } from './forma-arreglo.service';
import { FormaArregloController } from './forma-arreglo.controller';
import { FormaArreglo } from './entities/forma-arreglo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormaArreglo])],
  controllers: [FormaArregloController],
  providers: [FormaArregloService],
  exports: [FormaArregloService],
})
export class FormaArregloModule {}



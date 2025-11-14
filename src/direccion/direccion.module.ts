import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DireccionService } from './direccion.service';
import { DireccionController } from './direccion.controller';
import { Direccion } from './entities/direccion.entity';
import { MapboxModule } from 'src/common/mapbox/mapbox.module';

@Module({
  imports: [TypeOrmModule.forFeature([Direccion]), MapboxModule],
  controllers: [DireccionController],
  providers: [DireccionService],
  exports: [DireccionService],
})
export class DireccionModule {}

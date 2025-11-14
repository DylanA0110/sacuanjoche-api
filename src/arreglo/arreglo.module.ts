import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArregloService } from './arreglo.service';
import { ArregloController } from './arreglo.controller';
import { Arreglo } from './entities/arreglo.entity';
import { FormaArreglo } from 'src/forma-arreglo/entities/forma-arreglo.entity';
import { ArregloMedia } from './entities/arreglo-media.entity';
import { StorageModule } from 'src/common/storage/storage.module';
import { ArregloMediaService } from './services/arreglo-media.service';
import { ArregloMediaController } from './controllers/arreglo-media.controller';

@Module({
  imports: [
    StorageModule,
    TypeOrmModule.forFeature([Arreglo, FormaArreglo, ArregloMedia]),
  ],
  controllers: [ArregloController, ArregloMediaController],
  providers: [ArregloService, ArregloMediaService],
  exports: [ArregloService, ArregloMediaService],
})
export class ArregloModule {}

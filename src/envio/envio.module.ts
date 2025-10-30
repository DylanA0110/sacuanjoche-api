import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { Envio } from './entities/envio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Envio])],
  controllers: [EnvioController],
  providers: [EnvioService],
  exports: [EnvioService],
})
export class EnvioModule {}




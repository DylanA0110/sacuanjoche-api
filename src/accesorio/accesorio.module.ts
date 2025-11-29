import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesorioService } from './accesorio.service';
import { AccesorioController } from './accesorio.controller';
import { Accesorio } from './entities/accesorio.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Accesorio]), AuthModule],
  controllers: [AccesorioController],
  providers: [AccesorioService],
  exports: [AccesorioService],
})
export class AccesorioModule {}




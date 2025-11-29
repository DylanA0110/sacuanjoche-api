import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormaArregloService } from './forma-arreglo.service';
import { FormaArregloController } from './forma-arreglo.controller';
import { FormaArreglo } from './entities/forma-arreglo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FormaArreglo]), AuthModule],
  controllers: [FormaArregloController],
  providers: [FormaArregloService],
  exports: [FormaArregloService],
})
export class FormaArregloModule {}




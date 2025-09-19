import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Empleado } from './entities/empleado.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado, Rol])],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
  exports: [EmpleadoService],
})
export class EmpleadoModule {}

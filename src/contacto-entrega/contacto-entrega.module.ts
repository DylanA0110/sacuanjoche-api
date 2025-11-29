import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactoEntregaService } from './contacto-entrega.service';
import { ContactoEntregaController } from './contacto-entrega.controller';
import { ContactoEntrega } from './entities/contacto-entrega.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactoEntrega]), AuthModule],
  controllers: [ContactoEntregaController],
  providers: [ContactoEntregaService],
  exports: [ContactoEntregaService],
})
export class ContactoEntregaModule {}




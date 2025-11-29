import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolioService } from './folio.service';
import { FolioController } from './folio.controller';
import { Folio } from './entities/folio.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Folio]), AuthModule],
  controllers: [FolioController],
  providers: [FolioService],
  exports: [FolioService],
})
export class FolioModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolioService } from './folio.service';
import { FolioController } from './folio.controller';
import { Folio } from './entities/folio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folio])],
  controllers: [FolioController],
  providers: [FolioService],
  exports: [FolioService],
})
export class FolioModule {}


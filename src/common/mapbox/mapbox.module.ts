import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MapboxService } from './mapbox.service';
import { MapboxController } from './mapbox.controller';

@Module({
  imports: [HttpModule],
  providers: [MapboxService],
  controllers: [MapboxController],
  exports: [MapboxService],
})
export class MapboxModule {}

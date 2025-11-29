import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MapboxService } from './mapbox.service';
import { MapboxController } from './mapbox.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  providers: [MapboxService],
  controllers: [MapboxController],
  exports: [MapboxService],
})
export class MapboxModule {}

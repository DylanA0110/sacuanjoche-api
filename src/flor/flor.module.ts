import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlorService } from './flor.service';
import { FlorController } from './flor.controller';
import { Flor } from './entities/flor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Flor]), AuthModule],
  controllers: [FlorController],
  providers: [FlorService],
  exports: [FlorService],
})
export class FlorModule {}




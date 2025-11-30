import { Module } from '@nestjs/common';
import { AdminNotificationsGateway } from './notifications.gateway';
import { NotificationsService } from './notifications.service';

@Module({
  providers: [AdminNotificationsGateway, NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}


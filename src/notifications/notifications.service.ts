import { Injectable } from '@nestjs/common';
import { AdminNotificationsGateway } from './notifications.gateway';
import { AdminNotificationPayload } from './notifications.types';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly adminGateway: AdminNotificationsGateway,
  ) {}

  emitAdminNotification(payload: AdminNotificationPayload): void {
    this.adminGateway.emitAdminNotification(payload);
  }
}


import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ADMIN_NOTIFICATION_EVENT,
  AdminNotificationPayload,
} from './notifications.types';

@WebSocketGateway({
  namespace: '/admin',
  cors: {
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:5173', // desarrollo local
      process.env.FRONTEND_PROD_URL, // producción (si existe)
    ].filter(Boolean),
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class AdminNotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(AdminNotificationsGateway.name);

  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket) {
    this.logger.debug(`Admin connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Admin disconnected: ${client.id}`);
  }

  emitAdminNotification(payload: AdminNotificationPayload): void {
    this.server.emit(ADMIN_NOTIFICATION_EVENT, payload);
    this.logger.debug(
      `Notification emitted to all admins: ${payload.tipo} - ${payload.id_registro}`,
    );
  }
}


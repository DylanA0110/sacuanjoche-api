export type AdminNotificationType = 'nuevo_pedido_web';

interface BaseNotificationPayload {
  tipo: AdminNotificationType;
  id_registro: number | string;
  nombre_cliente?: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

export type AdminNotificationPayload = BaseNotificationPayload & {
  tipo: AdminNotificationType;
};

export const ADMIN_NOTIFICATION_EVENT = 'adminNotification';


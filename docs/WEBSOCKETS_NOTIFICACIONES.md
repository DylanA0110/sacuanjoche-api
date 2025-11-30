# WebSockets - Notificaciones en Tiempo Real

## Resumen

Este documento describe cómo implementar las notificaciones en tiempo real usando WebSockets para el panel de administrador. Cuando se crea un pedido desde la web (landing page) que está pagado, se emite una notificación automáticamente a todos los administradores conectados.

## Configuración del Servidor

El servidor WebSocket está configurado en el namespace `/admin` y escucha en el mismo puerto que la API REST (por defecto `3000`).

### URLs de Conexión

- **Desarrollo:** `ws://localhost:3000/admin`
- **Producción:** `wss://tu-dominio.com/admin` (si usas HTTPS)

## Implementación en React

### Instalación de Dependencias

```bash
yarn add socket.io-client
# o
npm install socket.io-client
```

### Hook Personalizado para Notificaciones

```typescript
// hooks/useAdminNotifications.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { AdminNotificationPayload } from '../types/notifications';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const useAdminNotifications = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<AdminNotificationPayload[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Crear conexión al namespace /admin
    const newSocket = io(`${SOCKET_URL}/admin`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Evento: conexión establecida
    newSocket.on('connect', () => {
      console.log('Conectado al servidor de notificaciones');
      setIsConnected(true);
    });

    // Evento: desconexión
    newSocket.on('disconnect', () => {
      console.log('Desconectado del servidor de notificaciones');
      setIsConnected(false);
    });

    // Evento: nueva notificación
    newSocket.on('adminNotification', (payload: AdminNotificationPayload) => {
      console.log('Nueva notificación recibida:', payload);
      setNotifications((prev) => [payload, ...prev]);
    });

    setSocket(newSocket);

    // Limpieza al desmontar
    return () => {
      newSocket.close();
    };
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.id_registro.toString() !== id)
    );
  };

  return {
    socket,
    notifications,
    isConnected,
    clearNotifications,
    removeNotification,
  };
};
```

### Tipos TypeScript

```typescript
// types/notifications.ts
export type AdminNotificationType = 'nuevo_pedido_web';

export interface AdminNotificationPayload {
  tipo: AdminNotificationType;
  id_registro: number | string;
  nombre_cliente?: string;
  timestamp: string;
  data?: {
    numeroPedido?: string;
    totalPedido?: number;
    estado?: string;
    canal?: string;
    fechaEntregaEstimada?: string;
    cantidadProductos?: number;
  };
}
```

### Componente de Notificaciones

```typescript
// components/AdminNotifications.tsx
import React, { useState } from 'react';
import { useAdminNotifications } from '../hooks/useAdminNotifications';
import { AdminNotificationPayload } from '../types/notifications';

export const AdminNotifications: React.FC = () => {
  const {
    notifications,
    isConnected,
    clearNotifications,
    removeNotification,
  } = useAdminNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getNotificationMessage = (notif: AdminNotificationPayload) => {
    switch (notif.tipo) {
      case 'nuevo_pedido_web':
        return `Nuevo pedido web #${notif.data?.numeroPedido || notif.id_registro}`;
      default:
        return 'Nueva notificación';
    }
  };

  const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
      case 'nuevo_pedido_web':
        return '🛒';
      default:
        return '🔔';
    }
  };

  return (
    <div className="notifications-container">
      {/* Botón de notificaciones */}
      <button
        className="notifications-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notificaciones"
      >
        <span className="notification-icon">🔔</span>
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
        {!isConnected && (
          <span className="connection-indicator" title="Desconectado">
            ⚠️
          </span>
        )}
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <h3>Notificaciones</h3>
            <div className="notifications-actions">
              {notifications.length > 0 && (
                <button onClick={clearNotifications} className="clear-button">
                  Limpiar todas
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="close-button">
                ✕
              </button>
            </div>
          </div>

          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                No hay notificaciones
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={`${notif.tipo}-${notif.id_registro}-${notif.timestamp}`}
                  className="notification-item"
                >
                  <div className="notification-content">
                    <div className="notification-icon-large">
                      {getNotificationIcon(notif.tipo)}
                    </div>
                    <div className="notification-details">
                      <div className="notification-title">
                        {getNotificationMessage(notif)}
                      </div>
                      {notif.nombre_cliente && (
                        <div className="notification-subtitle">
                          Cliente: {notif.nombre_cliente}
                        </div>
                      )}
                      {notif.data?.totalPedido && (
                        <div className="notification-subtitle">
                          Total: ${notif.data.totalPedido.toFixed(2)}
                        </div>
                      )}
                      <div className="notification-time">
                        {formatDate(notif.timestamp)}
                      </div>
                    </div>
                  </div>
                  <button
                    className="notification-remove"
                    onClick={() =>
                      removeNotification(notif.id_registro.toString())
                    }
                    aria-label="Eliminar notificación"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
```

### Estilos CSS (Ejemplo)

```css
/* styles/notifications.css */
.notifications-container {
  position: relative;
}

.notifications-button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 24px;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.connection-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
}

.notifications-panel {
  position: absolute;
  top: 100%;
  right: 0;
  width: 400px;
  max-height: 600px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.notifications-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.notifications-header h3 {
  margin: 0;
  font-size: 18px;
}

.notifications-actions {
  display: flex;
  gap: 8px;
}

.clear-button,
.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  color: #666;
  font-size: 14px;
}

.clear-button:hover,
.close-button:hover {
  color: #000;
}

.notifications-list {
  overflow-y: auto;
  flex: 1;
}

.no-notifications {
  padding: 32px;
  text-align: center;
  color: #999;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f5f5f5;
}

.notification-content {
  display: flex;
  gap: 12px;
  flex: 1;
}

.notification-icon-large {
  font-size: 24px;
}

.notification-details {
  flex: 1;
}

.notification-title {
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

.notification-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
}

.notification-time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.notification-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
  font-size: 16px;
  line-height: 1;
}

.notification-remove:hover {
  color: #ff4444;
}
```

### Uso en el Panel de Administrador

```typescript
// pages/AdminDashboard.tsx
import React from 'react';
import { AdminNotifications } from '../components/AdminNotifications';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Panel de Administrador</h1>
        <AdminNotifications />
      </header>
      {/* Resto del contenido del dashboard */}
    </div>
  );
};
```

## Estructura de la Notificación

Cuando se crea un pedido desde la web, se emite una notificación con la siguiente estructura:

```typescript
{
  tipo: 'nuevo_pedido_web',
  id_registro: 123, // ID del pedido
  nombre_cliente: 'Juan Pérez', // Nombre completo del cliente
  timestamp: '2024-12-20T10:30:00.000Z', // ISO 8601
  data: {
    numeroPedido: 'PED-00001',
    totalPedido: 175.50,
    estado: 'procesando',
    canal: 'web',
    fechaEntregaEstimada: '2024-12-25T10:00:00.000Z',
    cantidadProductos: 2
  }
}
```

## Eventos del Socket

### Eventos del Cliente

- **`connect`**: Se emite cuando el cliente se conecta al servidor
- **`disconnect`**: Se emite cuando el cliente se desconecta del servidor
- **`adminNotification`**: Se emite cuando hay una nueva notificación para el administrador

### Ejemplo de Manejo de Eventos

```typescript
socket.on('connect', () => {
  console.log('Conectado');
});

socket.on('disconnect', (reason) => {
  console.log('Desconectado:', reason);
  // Intentar reconectar si es necesario
  if (reason === 'io server disconnect') {
    socket.connect();
  }
});

socket.on('adminNotification', (payload) => {
  // Manejar la notificación
  console.log('Nueva notificación:', payload);
  
  // Mostrar notificación toast/alert
  showToast(`Nuevo pedido: ${payload.data?.numeroPedido}`);
  
  // Actualizar estado de la aplicación
  updatePedidosList();
});
```

## Manejo de Errores y Reconexión

El cliente de Socket.IO maneja automáticamente la reconexión, pero puedes personalizar el comportamiento:

```typescript
const socket = io(`${SOCKET_URL}/admin`, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  timeout: 20000,
});

socket.on('reconnect', (attemptNumber) => {
  console.log(`Reconectado después de ${attemptNumber} intentos`);
});

socket.on('reconnect_attempt', () => {
  console.log('Intentando reconectar...');
});

socket.on('reconnect_error', (error) => {
  console.error('Error al reconectar:', error);
});

socket.on('reconnect_failed', () => {
  console.error('No se pudo reconectar al servidor');
  // Mostrar mensaje al usuario
});
```

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno:

```env
# .env
REACT_APP_API_URL=http://localhost:3000
# o en producción:
# REACT_APP_API_URL=https://api.tu-dominio.com
```

## Pruebas

Para probar las notificaciones:

1. Abre el panel de administrador en tu aplicación React
2. En otra pestaña o herramienta (Postman, etc.), crea un pedido desde el carrito usando el endpoint `POST /carrito/:idCarrito/crear-pedido`
3. Deberías ver la notificación aparecer automáticamente en el panel de administrador

## Notas Importantes

1. **Autenticación**: Actualmente el gateway no requiere autenticación. Si necesitas autenticación, puedes implementarla usando middleware de Socket.IO.

2. **CORS**: El gateway está configurado para aceptar conexiones desde los orígenes especificados en `FRONTEND_URL` y `FRONTEND_PROD_URL`.

3. **Escalabilidad**: Si planeas usar múltiples instancias del servidor, necesitarás un adaptador de Socket.IO compartido (como Redis).

4. **Rendimiento**: Las notificaciones se emiten a todos los administradores conectados. Si tienes muchos administradores, considera usar rooms o salas específicas.

## Solución de Problemas

### No se reciben notificaciones

1. Verifica que el servidor esté corriendo
2. Verifica la URL de conexión
3. Revisa la consola del navegador para errores
4. Verifica que el namespace sea `/admin`

### Conexión se cierra frecuentemente

1. Verifica la configuración de CORS
2. Verifica que el servidor no esté reiniciándose
3. Revisa los logs del servidor para errores

### Notificaciones duplicadas

1. Asegúrate de que solo hay una instancia del hook `useAdminNotifications` activa
2. Verifica que no estés creando múltiples conexiones de socket

---

## Contacto

Si tienes preguntas o encuentras problemas, contacta al equipo de desarrollo.


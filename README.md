<h1 align="center">Sacuanjoche API</h1>

Backend para la gestión integral de pedidos de una floristería nicaragüense. Provee un núcleo administrativo para el equipo interno, optimiza rutas de reparto en tiempo real con Mapbox y expone servicios que alimentarán una landing page pública donde los clientes podrán descubrir y comprar arreglos florales. El sistema contempla almacenamiento multimedia en la nube, cálculos automáticos de distancias, y una integración flexible de métodos de pago (iniciando con PayPal, pero con una capa preparada para intercambiar proveedores en el futuro).

---

## Tabla de contenidos

- [Principales capacidades](#principales-capacidades)
- [Arquitectura y tecnologías](#arquitectura-y-tecnologías)
- [Estado actual del proyecto](#estado-actual-del-proyecto)
- [Requisitos e instalación](#requisitos-e-instalación)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución y pruebas](#ejecución-y-pruebas)
- [Documentación adicional](#documentación-adicional)
- [Próximos pasos](#próximos-pasos)
- [Licencia](#licencia)

---

## Principales capacidades

- **Gestión de pedidos** con entidades normalizadas para clientes, direcciones, detalles, envíos y facturación.
- **Galería de arreglos florales**: subida de múltiples imágenes a DigitalOcean Spaces mediante URLs firmadas y control del tamaño máximo permitido.
- **Optimización de rutas**: cálculo automatizado de trayectos usando Mapbox Optimized Trips y sincronización de los envíos asociados a cada pedido.
- **Geocodificación completa**:
  - Búsqueda forward (texto a coordenadas) con filtros por país, bbox y proximidad.
  - Reverse geocoding para autocompletar direcciones en base a coordenadas.
- **Cálculos logísticos**: origen/destino y distancia en kilómetros para cada envío (con fallback Haversine si Mapbox Directions no responde).
- **Totales automáticos**: los detalles de pedido recalculan subtotal (`cantidad * precio_unitario`), `totalProductos` y `totalPedido` cada vez que se crean, actualizan o eliminan.
- **Control de estados de envío** enlazado con rutas optimizadas, manteniendo historial individual por pedido.
- **Landing page futura**: los endpoints actuales están diseñados para alimentar un frontend público con catálogo, carrito y checkout.
- **Integración de pagos extensible**: se iniciará con PayPal, pero se definió una capa de configuración que permitirá intercambiar el gateway sin romper el dominio.

---

## Arquitectura y tecnologías

- **NestJS (TypeScript)** como framework principal.
- **TypeORM** para acceso a datos sobre PostgreSQL.
- **Mapbox APIs** (Optimized Trips, Geocoding, Directions) para logística.
- **DigitalOcean Spaces (S3 compatible)** para contenidos multimedia.
- **Jest** y tooling provistos por NestJS para pruebas.

Estructuralmente el proyecto está dividido en módulos de dominio (`pedido`, `detalle-pedido`, `envio`, `ruta`, `arreglo`, etc.) y módulos comunes (`common/mapbox`, `common/storage`) que encapsulan integraciones externas.

---

## Estado actual del proyecto

| Área                   | Entregables completados                                                                                                                                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mapbox**             | Servicio unificado con forward geocoding (estricto y relajado), reverse geocoding, optimización de rutas y cálculo de distancias punto a punto. Control de parámetros (país, idioma, bbox, proximidad, fuzzy match) expuesto vía DTOs. |
| **Direcciones**        | Autocompletado a partir de coordenadas, guardado de campos normalizados (calle, ciudad, barrio, etc.).                                                                                                                                 |
| **Envíos**             | Entidad enlazada 1:1 con pedidos. Asignación automática de coordenadas, distancia y estado al crear/editar envíos o al generar rutas. Evita recalcular envíos ya entregados.                                                           |
| **Rutas**              | Generación de rutas óptimas desde el punto de salida configurado, creación de secuencias `ruta_pedido` y sincronización de envíos asociados.                                                                                           |
| **Arreglos**           | Módulo para administrar arreglos florales, con soporte de galerías y documentación en `docs/imagenes-arreglos.md`.                                                                                                                     |
| **Storage**            | Integración con Spaces usando AWS SDK. Validación de tamaño máximo (`DO_SPACES_MAX_UPLOAD_BYTES`) y generación de URLs firmadas temporales.                                                                                            |
| **Pedidos**            | Cálculo automático de `totalProductos` y `totalPedido` según los detalles activos.                                                                                                                                                     |
| **Detalles de pedido** | Hooks que recalculan subtotal (`cantidad * precio_unitario`) y actualizan totales del pedido al crear/editar/eliminar.                                                                                                                 |
| **Documentación**      | Guía de imágenes, variables de entorno esenciales, recomendaciones de frontend (por ejemplo Mapbox search via backend).                                                                                                                |

---

## Requisitos e instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/DylanA0110/sacuanjoche-api.git
   cd sacuanjoche-api
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar la base de datos PostgreSQL**
   - Puedes usar el `docker-compose.yaml` incluido para levantar PostgreSQL y pgAdmin.
   - Alternativamente, apunta a tu instancia existente y ajusta `src/data-source.ts` o las variables de entorno correspondientes.

4. **Completar el archivo `.env`** (ver sección siguiente).

---

## Variables de entorno

### Mapbox

```
MAPBOX_ACCESS_TOKEN=
MAPBOX_PROFILE=driving
ROUTING_ORIGIN_LAT=
ROUTING_ORIGIN_LNG=
# Alternativa: DELIVERY_ORIGIN_LAT / DELIVERY_ORIGIN_LNG si deseas separar capas
```

### DigitalOcean Spaces

```
DO_SPACES_BUCKET=
DO_SPACES_REGION=
DO_SPACES_ENDPOINT=
DO_SPACES_KEY=
DO_SPACES_SECRET=
DO_SPACES_CDN_URL=
DO_SPACES_PUBLIC_BASE_URL=
DO_SPACES_UPLOAD_EXPIRATION=3600
DO_SPACES_DEFAULT_ACL=public-read
DO_SPACES_MAX_UPLOAD_BYTES=5242880
```

### Pagos (fase inicial)

```
PAYMENT_PROVIDER=paypal
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_RETURN_URL=
PAYPAL_CANCEL_URL=
```

> `PAYMENT_PROVIDER` se diseñó para poder alternar a otro gateway (por ejemplo Stripe o Adyen) sin reescribir el dominio.

### Base de datos y otros

```
DATABASE_URL=postgres://user:password@localhost:5432/sacuanjoche
NODE_ENV=development
PORT=3000
```

---

## Ejecución y pruebas

```bash
# Desarrollo (watch mode)


# Producción
npm run start:prod

# Pruebas unitarias
npm run test

# Pruebas e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

---

## Documentación adicional

- `docs/imagenes-arreglos.md`: flujo completo para subir y confirmar imágenes de arreglos usando URLs firmadas.
- `docs/paypal-integration-frontend.md`: guía completa para integrar PayPal en el frontend, incluyendo ejemplos de código, flujo paso a paso y manejo de errores.
- Swagger/OpenAPI disponible al levantar la aplicación (rutas de Mapbox, Arreglo, Pedido, etc.).
- Este README como descripción general del alcance.

---

## Próximos pasos

1. **Landing page**: construir el frontend público que consuma los endpoints existentes (catálogo, búsqueda con geocoding, carrito y checkout).
2. **Integración de pagos**: instrumentar PayPal como primer gateway y definir procesos de captura, conciliación y reembolsos.
3. **Panel administrativo**: dashboards para monitorear rutas en vivo, estados de envíos y métricas de ventas.
4. **Notificaciones**: correo o SMS para clientes y repartidores en hitos clave (pedido confirmado, ruta asignada, entrega realizada).
5. **Automatización de facturación**: generación de documentos fiscales y conciliación con la pasarela de pago.

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Revisa el archivo `LICENSE` para más detalles.

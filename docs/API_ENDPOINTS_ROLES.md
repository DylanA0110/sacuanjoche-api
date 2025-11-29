# Documentación de Endpoints y Roles de Acceso

Esta documentación describe todos los endpoints de la API y los roles que tienen acceso a cada uno.

## Base URL
```
http://localhost:3000/api
```

## Roles Disponibles

- **admin**: Administrador del sistema (acceso completo)
- **vendedor**: Vendedor/empleado de la tienda
- **conductor**: Conductor/repartidor
- **cliente**: Cliente final

**Nota**: Todos los endpoints que requieren autenticación también permiten acceso al rol `admin` para facilitar las pruebas del sistema.

---

## Endpoints Públicos (Sin Autenticación)

### Auth
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión

### Catálogo Público
- `GET /arreglos/public` - Catálogo público de arreglos florales
- `GET /flor/public` - Lista de flores activas (para filtros)
- `GET /accesorio/public` - Lista de accesorios activos (para filtros)

### Webhooks
- `POST /pago/paypal/webhook` - Webhook de PayPal para notificaciones

---

## Endpoints por Módulo

### 1. Autenticación (`/auth`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/auth/register` | Público | Registrar nuevo usuario |
| POST | `/auth/login` | Público | Iniciar sesión |
| GET | `/auth/check-status` | admin, vendedor, conductor, cliente | Verificar estado de autenticación |
| GET | `/auth/private` | Autenticado | Ruta privada de prueba |
| PATCH | `/auth/users/:id/roles` | admin | Actualizar roles de un usuario |

---

### 2. Pedidos (`/pedido`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/pedido` | admin, vendedor, cliente | Crear un nuevo pedido |
| GET | `/pedido` | admin, vendedor, conductor, cliente | Obtener todos los pedidos con paginación |
| GET | `/pedido/:id` | admin, vendedor, conductor, cliente | Obtener un pedido por ID |
| PATCH | `/pedido/:id` | admin, vendedor | Actualizar un pedido |
| DELETE | `/pedido/:id` | admin | Eliminar un pedido |
| POST | `/pedido/:id/asociar-pago` | admin, vendedor | Asociar un pago a un pedido existente |

---

### 3. Clientes (`/cliente`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/cliente` | admin, vendedor, cliente | Crear un nuevo cliente |
| GET | `/cliente` | admin, vendedor, cliente | Obtener todos los clientes con paginación |
| GET | `/cliente/:id` | admin, vendedor, cliente | Obtener un cliente por ID |
| PATCH | `/cliente/:id` | admin, vendedor, cliente | Actualizar un cliente |
| DELETE | `/cliente/:id` | admin | Eliminar un cliente |

---

### 4. Carritos (`/carrito`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/carrito` | admin, cliente | Crear un nuevo carrito |
| GET | `/carrito` | admin, cliente | Obtener todos los carritos con paginación |
| GET | `/carrito/:id` | admin, cliente | Obtener un carrito por ID |
| PATCH | `/carrito/:id` | admin, cliente | Actualizar un carrito |
| DELETE | `/carrito/:id` | admin, cliente | Eliminar un carrito |

---

### 5. Carritos-Arreglos (`/carritos-arreglo`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/carritos-arreglo` | admin, cliente | Crear un nuevo carrito arreglo |
| GET | `/carritos-arreglo` | admin, cliente | Obtener todos los carritos arreglos con paginación |
| PATCH | `/carritos-arreglo/:id` | admin, cliente | Actualizar un carrito arreglo |
| DELETE | `/carritos-arreglo/:id` | admin, cliente | Eliminar un carrito arreglo |

---

### 6. Pagos (`/pago`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/pago` | admin, vendedor, cliente | Crear un nuevo pago |
| GET | `/pago` | admin, vendedor, cliente | Obtener todos los pagos con paginación |
| GET | `/pago/:id` | admin, vendedor, cliente | Obtener un pago por ID |
| PATCH | `/pago/:id` | admin, vendedor | Actualizar un pago |
| DELETE | `/pago/:id` | admin | Eliminar un pago |
| POST | `/pago/paypal/create` | admin, cliente | Crear pago con PayPal |
| POST | `/pago/paypal/confirm/:idPago` | admin, cliente | Confirmar pago de PayPal |
| POST | `/pago/paypal/webhook` | Público | Webhook de PayPal |

---

### 7. Envíos (`/envio`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/envio` | admin, vendedor | Crear un nuevo envío |
| GET | `/envio` | admin, vendedor, conductor, cliente | Obtener todos los envíos con paginación |
| GET | `/envio/:id` | admin, vendedor, conductor, cliente | Obtener un envío por ID |
| PATCH | `/envio/:id` | admin, vendedor, conductor | Actualizar un envío |
| DELETE | `/envio/:id` | admin | Eliminar un envío |

---

### 8. Reportes (`/reports`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| GET | `/reports/factura/:idFactura/pdf` | admin, vendedor, cliente | Generar PDF de factura |
| GET | `/reports/pedido/:idPedido/orden-trabajo/pdf` | admin, vendedor, conductor | Generar PDF de Orden de Trabajo |
| GET | `/reports/pedidos/pdf` | admin, vendedor | Generar PDF de reporte de pedidos |
| GET | `/reports/facturas/pdf` | admin, vendedor | Generar PDF de reporte de facturas |
| GET | `/reports/arreglos/pdf` | admin, vendedor | Generar PDF de reporte de arreglos |
| GET | `/reports/pedidos/detallado/pdf` | admin, vendedor | Generar PDF de reporte detallado de pedidos |

---

### 9. Rutas (`/rutas`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/rutas` | admin, vendedor | Generar una ruta optimizada con Mapbox |
| GET | `/rutas` | admin, vendedor, conductor | Listar rutas optimizadas |
| GET | `/rutas/:idRuta` | admin, vendedor, conductor | Obtener detalle de una ruta |

---

### 10. Empleados (`/empleado`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/empleado` | admin | Crear un nuevo empleado |
| GET | `/empleado` | admin, vendedor, conductor | Obtener todos los empleados con paginación |
| GET | `/empleado/:id` | admin, vendedor, conductor | Obtener un empleado por ID |
| PATCH | `/empleado/:id` | admin, conductor | Actualizar un empleado |
| DELETE | `/empleado/:id` | admin | Eliminar un empleado |

---

### 11. Facturas (`/factura`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/factura` | admin, vendedor | Crear una nueva factura |
| POST | `/factura/desde-pedido/:idPedido` | admin, vendedor | Convertir un pedido pagado en factura |
| GET | `/factura` | admin, vendedor, cliente | Obtener todas las facturas con paginación |
| GET | `/factura/:id` | admin, vendedor, cliente | Obtener una factura por ID |
| PATCH | `/factura/:id` | admin, vendedor | Actualizar una factura |
| DELETE | `/factura/:id` | admin | Eliminar una factura |

---

### 12. Folios (`/folio`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/folio` | admin | Crear un nuevo folio |
| GET | `/folio` | admin, vendedor | Obtener todos los folios con paginación |
| GET | `/folio/:id` | admin, vendedor | Obtener un folio por ID |
| PATCH | `/folio/:id` | admin | Actualizar un folio |
| DELETE | `/folio/:id` | admin | Eliminar un folio |
| GET | `/folio/siguiente/:documento` | admin, vendedor | Obtener el siguiente número de folio para un documento |

---

### 13. Métodos de Pago (`/metodo-pago`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/metodo-pago` | admin | Crear un nuevo método de pago |
| GET | `/metodo-pago` | admin, vendedor, cliente | Obtener todos los métodos de pago con paginación |
| GET | `/metodo-pago/por-canal/:canal` | admin, vendedor, cliente | Obtener métodos de pago disponibles para un canal específico |
| GET | `/metodo-pago/:id` | admin, vendedor, cliente | Obtener un método de pago por ID |
| PATCH | `/metodo-pago/:id` | admin | Actualizar un método de pago |
| DELETE | `/metodo-pago/:id` | admin | Eliminar un método de pago |

---

### 14. Arreglos (`/arreglos`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/arreglos` | admin, vendedor | Crear un nuevo arreglo floral |
| GET | `/arreglos` | admin, vendedor | Listar arreglos (admin) con filtros |
| GET | `/arreglos/public` | Público | Catálogo público con filtros avanzados |
| GET | `/arreglos/:id` | admin, vendedor | Obtener un arreglo por ID |
| PATCH | `/arreglos/:id` | admin, vendedor | Actualizar un arreglo |
| DELETE | `/arreglos/:id` | admin | Eliminar un arreglo |

---

### 15. Arreglos Media (`/arreglos`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/arreglos/:id/media` | admin, vendedor | Guardar una imagen de Supabase para un arreglo |
| POST | `/arreglos/:id/media/batch` | admin, vendedor | Guardar múltiples imágenes de Supabase para un arreglo |
| GET | `/arreglos/:id/media` | admin, vendedor, cliente | Obtener todas las imágenes de un arreglo |
| PATCH | `/arreglos/:id/media/:mediaId` | admin, vendedor | Actualizar orden, tipo, isPrimary o altText de una imagen |
| DELETE | `/arreglos/:id/media/:mediaId` | admin, vendedor | Eliminar una imagen específica |

---

### 16. Catálogo (`/catalogo`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| GET | `/catalogo/filtros` | admin, vendedor, cliente | Obtener opciones de filtros disponibles para el catálogo |

---

### 17. Flores (`/flor`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/flor` | admin, vendedor | Crear una nueva flor |
| GET | `/flor` | admin, vendedor | Obtener todas las flores con paginación |
| GET | `/flor/public` | Público | Obtener flores activas para catálogo público |
| GET | `/flor/:id` | admin, vendedor | Obtener una flor por ID |
| PATCH | `/flor/:id` | admin, vendedor | Actualizar una flor |
| DELETE | `/flor/:id` | admin | Eliminar una flor |

---

### 18. Accesorios (`/accesorio`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/accesorio` | admin, vendedor | Crear un nuevo accesorio |
| GET | `/accesorio` | admin, vendedor | Obtener todos los accesorios con paginación |
| GET | `/accesorio/public` | Público | Obtener accesorios activos para catálogo público |
| GET | `/accesorio/:id` | admin, vendedor | Obtener un accesorio por ID |
| PATCH | `/accesorio/:id` | admin, vendedor | Actualizar un accesorio |
| DELETE | `/accesorio/:id` | admin | Eliminar un accesorio |

---

### 19. Formas de Arreglo (`/forma-arreglo`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/forma-arreglo` | admin, vendedor | Crear una nueva forma de arreglo |
| GET | `/forma-arreglo` | admin, vendedor | Obtener todas las formas de arreglo con paginación |
| GET | `/forma-arreglo/:id` | admin, vendedor | Obtener una forma de arreglo por ID |
| PATCH | `/forma-arreglo/:id` | admin, vendedor | Actualizar una forma de arreglo |
| DELETE | `/forma-arreglo/:id` | admin | Eliminar una forma de arreglo |

---

### 20. Direcciones (`/direccion`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/direccion` | admin, vendedor, cliente | Crear una nueva dirección |
| GET | `/direccion` | admin, vendedor, conductor, cliente | Obtener todas las direcciones con paginación |
| GET | `/direccion/:id` | admin, vendedor, conductor, cliente | Obtener una dirección por ID |
| PATCH | `/direccion/:id` | admin, vendedor, cliente | Actualizar una dirección |
| DELETE | `/direccion/:id` | admin, vendedor, cliente | Eliminar una dirección |

---

### 21. Contactos de Entrega (`/contacto-entrega`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/contacto-entrega` | admin, vendedor, cliente | Crear un nuevo contacto de entrega |
| GET | `/contacto-entrega` | admin, vendedor, conductor, cliente | Obtener todos los contactos de entrega con paginación |
| GET | `/contacto-entrega/:id` | admin, vendedor, conductor, cliente | Obtener un contacto de entrega por ID |
| PATCH | `/contacto-entrega/:id` | admin, vendedor, cliente | Actualizar un contacto de entrega |
| DELETE | `/contacto-entrega/:id` | admin, vendedor, cliente | Eliminar un contacto de entrega |

---

### 22. Cliente Direcciones (`/cliente-direccion`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/cliente-direccion` | admin, vendedor, cliente | Crear una nueva cliente dirección |
| GET | `/cliente-direccion` | admin, vendedor, cliente | Obtener todas las cliente direcciones con paginación |
| GET | `/cliente-direccion/:id` | admin, vendedor, cliente | Obtener una cliente dirección por ID |
| PATCH | `/cliente-direccion/:id` | admin, vendedor, cliente | Actualizar una cliente dirección |
| DELETE | `/cliente-direccion/:id` | admin, vendedor, cliente | Eliminar una cliente dirección |

---

### 23. Arreglo Flores (`/arreglo-flor`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/arreglo-flor` | admin, vendedor | Crear una nueva arreglo flor |
| GET | `/arreglo-flor` | admin, vendedor | Obtener todas las arreglo flores con paginación |
| GET | `/arreglo-flor/:id` | admin, vendedor | Obtener una arreglo flor por ID |
| PATCH | `/arreglo-flor/:id` | admin, vendedor | Actualizar una arreglo flor |
| DELETE | `/arreglo-flor/:id` | admin, vendedor | Eliminar una arreglo flor |

---

### 24. Accesorios Arreglos (`/accesorios-arreglo`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/accesorios-arreglo` | admin, vendedor | Crear una nueva accesorios arreglo |
| GET | `/accesorios-arreglo` | admin, vendedor | Obtener todas las accesorios arreglos con paginación |
| GET | `/accesorios-arreglo/:id` | admin, vendedor | Obtener una accesorios arreglo por ID |
| PATCH | `/accesorios-arreglo/:id` | admin, vendedor | Actualizar una accesorios arreglo |
| DELETE | `/accesorios-arreglo/:id` | admin, vendedor | Eliminar una accesorios arreglo |

---

### 25. Detalle Pedidos (`/detalle-pedido`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/detalle-pedido` | admin, vendedor, cliente | Crear un nuevo detalle de pedido |
| GET | `/detalle-pedido` | admin, vendedor, cliente | Obtener todos los detalles de pedido con paginación |
| GET | `/detalle-pedido/:id` | admin, vendedor, cliente | Obtener un detalle pedido por ID |
| PATCH | `/detalle-pedido/:id` | admin, vendedor, cliente | Actualizar un detalle pedido |
| DELETE | `/detalle-pedido/:id` | admin, vendedor, cliente | Eliminar un detalle pedido |

---

### 26. Pedido Historial (`/pedido-historial`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/pedido-historial` | admin, vendedor, conductor, cliente | Crear un nuevo historial de pedido |
| GET | `/pedido-historial` | admin, vendedor, conductor, cliente | Obtener todos los historiales con paginación |
| GET | `/pedido-historial/pedido/:idPedido` | admin, vendedor, conductor, cliente | Buscar historiales por pedido |
| GET | `/pedido-historial/:id` | admin, vendedor, conductor, cliente | Obtener un historial por ID |
| PATCH | `/pedido-historial/:id` | admin, vendedor, conductor, cliente | Actualizar un historial |
| DELETE | `/pedido-historial/:id` | admin, vendedor, conductor, cliente | Eliminar un historial |

---

### 27. Factura Detalle (`/factura-detalle`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| POST | `/factura-detalle` | admin, vendedor | Crear un nuevo detalle de factura |
| GET | `/factura-detalle` | admin, vendedor, cliente | Obtener todos los detalles de factura con paginación |
| GET | `/factura-detalle/factura/:idFactura` | admin, vendedor, cliente | Buscar detalles por factura |
| GET | `/factura-detalle/:id` | admin, vendedor, cliente | Obtener un detalle de factura por ID |
| PATCH | `/factura-detalle/:id` | admin, vendedor | Actualizar un detalle de factura |
| DELETE | `/factura-detalle/:id` | admin, vendedor | Eliminar un detalle de factura |

---

### 28. Mapbox (`/mapbox`)

| Método | Endpoint | Roles Permitidos | Descripción |
|--------|----------|------------------|-------------|
| GET | `/mapbox/geocode` | admin, vendedor, conductor, cliente | Buscar direcciones usando Mapbox Geocoding |

---

## Resumen de Permisos por Rol

### Admin
- Acceso completo a todos los endpoints del sistema
- Puede crear, leer, actualizar y eliminar cualquier recurso
- Gestión de usuarios y roles
- Gestión de folios
- Generación de reportes

### Vendedor
- Gestión de pedidos, clientes, facturas
- Gestión de catálogo (arreglos, flores, accesorios)
- Creación y actualización de envíos
- Generación de reportes
- Visualización de rutas

### Conductor
- Visualización de pedidos y envíos asignados
- Actualización de estado de envíos
- Visualización de rutas
- Visualización de empleados
- Visualización de direcciones y contactos de entrega

### Cliente
- Gestión de su propio perfil y carrito
- Creación de pedidos
- Visualización de sus pedidos, facturas y envíos
- Acceso al catálogo público
- Creación y gestión de direcciones y contactos de entrega
- Pagos con PayPal

---

## Notas Importantes

1. **Autenticación**: Todos los endpoints (excepto los públicos) requieren un token JWT en el header `Authorization: Bearer <token>`

2. **Admin siempre tiene acceso**: Para facilitar las pruebas, todos los endpoints que requieren autenticación también permiten acceso al rol `admin`.

3. **Endpoints públicos**: Los endpoints públicos no requieren autenticación y están diseñados para ser accesibles desde la landing page.

4. **Swagger Documentation**: Puedes ver la documentación interactiva de la API en `http://localhost:3000/api` cuando el servidor está corriendo.

---

## Ejemplo de Uso

### Obtener token de autenticación
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

### Usar token en requests
```bash
GET /api/pedido
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

**Última actualización**: Noviembre 2025


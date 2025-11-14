# Gestión de Imágenes de Arreglos

Esta guía explica cómo funciona la gestión de imágenes para los arreglos florales utilizando DigitalOcean Spaces y los endpoints expuestos por la API.

## Requisitos previos

- Variables de entorno `DO_SPACES_*` configuradas en `.env`.
- Dependencias instaladas (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`).
- Servicio NestJS en ejecución.

## Flujo general

1. **Solicitar URL firmada**: Permite subir una imagen directamente a Spaces sin pasar por el servidor.
2. **Subir imagen a Spaces**: El frontend usa la URL firmada (`PUT`) para cargar el archivo.
3. **Registrar imagen en la API**: Se guarda la URL pública y metadatos en la base.
4. **Gestionar galería**: Se pueden listar, actualizar, desactivar y eliminar imágenes.

## Endpoints disponibles

### 1. Generar URL de carga

- **Ruta**: `POST /arreglo/media/upload-url`
- **Body** (`GenerateUploadUrlDto`):
  - `contentType`: MIME del archivo (`image/jpeg`, etc.)
  - `contentLength`: tamaño en bytes
  - `fileName` (opcional): ayuda a derivar la extensión
  - `arregloId` (opcional): organiza los archivos en la carpeta del arreglo
- **Respuesta**: `uploadUrl`, `expiresAt`, `objectKey`, `publicUrl`

> Usa `uploadUrl` para realizar un `PUT` directo desde el frontend a Spaces.

### 2. Registrar imagen en un arreglo

- **Ruta**: `POST /arreglo/:id/media`
- **Body** (`CreateArregloMediaDto`):
  - `url`: URL pública (por ejemplo `publicUrl` del paso anterior)
  - `objectKey`: ruta interna en Spaces
  - `provider`: opcional, default `spaces`
  - `contentType`, `altText`, `orden`, `isPrimary`, `metadata` (opcional)
- Marca como principal con `isPrimary=true` para que actualice `arreglo.url`.

### 3. Listar imágenes activas

- **Ruta**: `GET /arreglo/:id/media`
- Ordena por `orden` e `idArregloMedia`.

### 4. Actualizar metadatos

- **Ruta**: `PATCH /arreglo/:id/media/:mediaId`
- **Body** (`UpdateArregloMediaDto`): mismos campos opcionales que en create.
- Actualizar `isPrimary` reasigna la imagen principal.

### 5. Desactivar/Eliminar imagen

- **Ruta**: `DELETE /arreglo/:id/media/:mediaId`
- Query opcional `deleteObject=true` elimina el archivo en Spaces.
- Si la imagen era principal, se elige automáticamente otra.

## Relación con la entidad `Arreglo`

- `Arreglo.media` es `OneToMany` de `ArregloMedia`.
- `Arreglo.url` ahora es opcional; siempre almacena la URL de la imagen principal.
- Las respuestas de `create`, `findAll`, `findOne` incluyen la galería (`media`).

## DigitalOcean Spaces

- Las URLs firmadas caducan según `DO_SPACES_UPLOAD_EXPIRATION` (default 3600s).
- `SpacesService` usa `DO_SPACES_*` para construir URLs y eliminar objetos.

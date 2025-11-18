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
- `DO_SPACES_MAX_UPLOAD_BYTES` define el tamaño máximo permitido (por defecto 5 MB).

## Configuración CORS

Para que el frontend pueda subir archivos directamente a DigitalOcean Spaces, es necesario configurar CORS en el Space:

1. Ve a tu Space en DigitalOcean → Settings → CORS Configurations
2. Agrega una configuración con:
   - **Origin**: `http://localhost:5173` (y tu dominio de producción)
   - **Allowed Methods**: `GET`, `PUT`, `POST`, `DELETE`, `HEAD`
   - **Allowed Headers**: `*`
   - **Access Control Max Age**: `3000`

## Cómo hacer la petición desde el frontend

Cuando recibas la `uploadUrl` del endpoint, úsala así:

```typescript
// Ejemplo de subida de archivo
const uploadFile = async (file: File) => {
  // 1. Obtener URL firmada
  const { uploadUrl, objectKey, publicUrl } = await fetch('/api/arreglo/media/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contentType: file.type,
      contentLength: file.size,
      fileName: file.name,
      arregloId: 1, // opcional
    }),
  }).then(res => res.json());

  // 2. Subir archivo directamente a Spaces
  // IMPORTANTE: No incluyas Content-Type manualmente - el navegador lo agregará automáticamente
  // Si lo incluyes manualmente, puede causar problemas de CORS
  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      // NO incluyas 'Content-Type' aquí - el navegador lo detectará automáticamente del archivo
      // El backend ya no incluye ContentType en los signed headers para evitar problemas de CORS
    },
    body: file, // El archivo directamente, NO usar FormData
  });

  if (!uploadResponse.ok) {
    throw new Error('Error al subir el archivo');
  }

  // 3. Registrar la imagen en la API
  await fetch(`/api/arreglo/${arregloId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: publicUrl,
      objectKey: objectKey,
      contentType: file.type,
      isPrimary: true, // opcional
    }),
  });
};
```

**Importante:**
- **NO incluyas `Content-Type` manualmente** en los headers del `PUT` - el navegador lo detectará y agregará automáticamente del archivo.
- El backend ya no incluye `ContentType` en los signed headers para evitar problemas de CORS.
- No uses `FormData` para el body del `PUT`, envía el archivo directamente.
- Si persisten errores CORS, verifica que la configuración CORS en DigitalOcean Spaces esté guardada y espera 2-5 minutos para que se propague.
- Asegúrate de que `OPTIONS` esté incluido en los métodos permitidos en la configuración CORS de DigitalOcean Spaces.
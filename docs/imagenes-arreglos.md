# Gestión de Imágenes de Arreglos

Esta guía explica cómo funciona la gestión de imágenes para los arreglos florales utilizando Supabase Storage y los endpoints expuestos por la API.

## Requisitos previos

- Supabase configurado con un bucket llamado `CatalogoFloristeria`
- El frontend maneja la subida de imágenes directamente a Supabase Storage
- El backend solo almacena las URLs públicas de Supabase

## Flujo general

1. **Subir imagen a Supabase**: El frontend sube la imagen directamente a Supabase Storage (bucket: `CatalogoFloristeria`)
2. **Obtener URL pública**: Supabase devuelve una URL pública de la imagen
3. **Registrar imagen en la API**: El frontend envía la URL al backend para guardarla en la base de datos
4. **Gestionar galería**: Se pueden listar, actualizar y eliminar imágenes

## Endpoints disponibles

### 1. Guardar una imagen

- **Ruta**: `POST /api/arreglos/{id}/media`
- **Body** (`CreateArregloMediaSimpleDto`):
  - `url`: URL pública de Supabase (requerido)
  - `orden`: Orden dentro de la galería (opcional, default: siguiente disponible)
  - `isPrimary`: Si es la imagen principal (opcional, default: false)
  - `altText`: Texto alternativo (opcional)
- **Respuesta**: Objeto `ArregloMedia` creado

### 2. Guardar múltiples imágenes (batch)

- **Ruta**: `POST /api/arreglos/{id}/media/batch`
- **Body** (`CreateArregloMediaBatchDto`):
  - `imagenes`: Array de objetos con `url`, `orden`, `isPrimary`, `altText`
- **Respuesta**: Array de objetos `ArregloMedia` creados

### 3. Obtener imágenes de un arreglo

- **Ruta**: `GET /api/arreglos/{id}/media`
- **Respuesta**: Array de objetos `ArregloMedia` activos, ordenados por `orden`

### 4. Actualizar imagen

- **Ruta**: `PATCH /api/arreglos/{id}/media/{mediaId}`
- **Body** (`UpdateArregloMediaSupabaseDto`):
  - `orden`: Nuevo orden (opcional)
  - `tipo`: Tipo de media (opcional: 'imagen', 'video')
- **Respuesta**: Objeto `ArregloMedia` actualizado

### 5. Eliminar imagen

- **Ruta**: `DELETE /api/arreglos/{id}/media/{mediaId}`
- **Respuesta**: 204 No Content
- **Nota**: Solo desactiva el registro en la BD, no elimina el archivo de Supabase

## Relación con la entidad `Arreglo`

- `Arreglo.media` es `OneToMany` de `ArregloMedia`
- `Arreglo.url` almacena la URL de la imagen principal (se actualiza automáticamente)
- Las respuestas de `GET /api/arreglos/{id}` incluyen el array `media` con todas las imágenes activas

## Supabase Storage

- Las imágenes se suben directamente desde el frontend a Supabase Storage
- El backend solo almacena las URLs públicas devueltas por Supabase
- Formato de URL: `https://[project].supabase.co/storage/v1/object/public/CatalogoFloristeria/[path]`
- El backend extrae automáticamente el `objectKey` de la URL para referencia interna

## Cómo hacer la petición desde el frontend

```typescript
// Ejemplo de subida y registro de imagen
const uploadAndRegisterImage = async (arregloId: number, file: File) => {
  // 1. Subir imagen a Supabase Storage
  const fileName = `arreglos/${arregloId}/${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;

  const { error: uploadError } = await supabase.storage
    .from('CatalogoFloristeria')
    .upload(fileName, file, {
      contentType: 'image/jpeg',
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Error al subir imagen: ${uploadError.message}`);
  }

  // 2. Obtener URL pública
  const {
    data: { publicUrl },
  } = supabase.storage.from('CatalogoFloristeria').getPublicUrl(fileName);

  // 3. Registrar la imagen en el backend
  const response = await fetch(`/api/arreglos/${arregloId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: publicUrl,
      orden: 0, // opcional
      isPrimary: false, // opcional
      altText: 'Descripción de la imagen', // opcional
    }),
  });

  if (!response.ok) {
    throw new Error('Error al registrar la imagen');
  }

  return await response.json();
};

// Ejemplo de subida múltiple (batch)
const uploadMultipleImages = async (arregloId: number, files: File[]) => {
  const imagenes = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = `arreglos/${arregloId}/${Date.now()}-${i}-${Math.random().toString(36).substring(2)}.jpg`;

    // Subir a Supabase
    const { error } = await supabase.storage
      .from('CatalogoFloristeria')
      .upload(fileName, file, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: false,
      });

    if (!error) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('CatalogoFloristeria').getPublicUrl(fileName);

      imagenes.push({
        url: publicUrl,
        orden: i,
        isPrimary: i === 0, // Primera imagen como principal
      });
    }
  }

  // Registrar todas las imágenes en batch
  const response = await fetch(`/api/arreglos/${arregloId}/media/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imagenes }),
  });

  return await response.json();
};
```

**Notas importantes:**

- El frontend es responsable de subir las imágenes a Supabase Storage
- El backend solo almacena las URLs públicas
- Las URLs de Supabase son públicas y no requieren autenticación para acceder
- Si necesitas eliminar el archivo de Supabase, debes hacerlo desde el frontend usando el SDK de Supabase

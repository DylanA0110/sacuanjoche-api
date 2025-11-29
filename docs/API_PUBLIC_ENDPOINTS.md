# Documentación de Endpoints Públicos para Landing Page

Esta documentación describe los endpoints públicos disponibles para la landing page. Estos endpoints **NO requieren autenticación** y están diseñados para exponer solo la información necesaria para el catálogo público.

## Base URL

```
http://localhost:3000/api
```

---

## 1. Catálogo de Arreglos Florales

### `GET /arreglos/public`

Obtiene el catálogo público de arreglos florales con filtros avanzados. Retorna solo la información necesaria para mostrar en la landing page.

#### Parámetros de Query (todos opcionales)

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `limit` | number | Número de elementos por página (default: 10) | `10` |
| `offset` | number | Número de elementos a omitir (default: 0) | `0` |
| `q` | string | Texto a buscar en nombre, descripción o forma del arreglo | `"Bouquet romántico"` |
| `idFormaArreglo` | number | Filtrar por ID de forma de arreglo | `1` |
| `precioMin` | number | Precio mínimo | `50.00` |
| `precioMax` | number | Precio máximo | `200.00` |
| `flores` | string | IDs de flores separados por coma | `"1,2,3"` |
| `ordenarPor` | string | Campo para ordenar: `nombre`, `precio`, `fechaCreacion` | `"precio"` |
| `orden` | string | Dirección del orden: `ASC` o `DESC` | `"ASC"` |

#### Ejemplo de Request

```http
GET /arreglos/public?limit=12&offset=0&precioMin=50&precioMax=200&ordenarPor=precio&orden=ASC
```

#### Ejemplo de Response (200 OK)

```json
[
  {
    "idArreglo": 1,
    "nombre": "Bouquet Romántico",
    "descripcion": "Hermoso bouquet con rosas rojas y rosas blancas",
    "precioUnitario": 150.00,
    "url": null,
    "formaArreglo": {
      "idFormaArreglo": 1,
      "descripcion": "Bouquet"
    },
    "media": [
      {
        "idArregloMedia": 1,
        "url": "https://example.com/image1.jpg",
        "orden": 1,
        "isPrimary": true,
        "altText": "Bouquet romántico - vista principal"
      },
      {
        "idArregloMedia": 2,
        "url": "https://example.com/image2.jpg",
        "orden": 2,
        "isPrimary": false,
        "altText": "Bouquet romántico - vista lateral"
      }
    ]
  },
  {
    "idArreglo": 2,
    "nombre": "Centro de Mesa Elegante",
    "descripcion": "Centro de mesa con flores variadas",
    "precioUnitario": 200.00,
    "url": null,
    "formaArreglo": {
      "idFormaArreglo": 2,
      "descripcion": "Centro de Mesa"
    },
    "media": [
      {
        "idArregloMedia": 3,
        "url": "https://example.com/image3.jpg",
        "orden": 1,
        "isPrimary": true,
        "altText": "Centro de mesa elegante"
      }
    ]
  }
]
```

#### Estructura de la Respuesta

- **idArreglo**: ID único del arreglo
- **nombre**: Nombre del arreglo
- **descripcion**: Descripción del arreglo (puede ser null)
- **precioUnitario**: Precio del arreglo
- **url**: URL del arreglo (puede ser null)
- **formaArreglo**: Objeto con información de la forma del arreglo
  - **idFormaArreglo**: ID de la forma
  - **descripcion**: Descripción de la forma
- **media**: Array de imágenes del arreglo, ordenadas por `orden`
  - **idArregloMedia**: ID de la imagen
  - **url**: URL de la imagen
  - **orden**: Orden de visualización
  - **isPrimary**: Si es la imagen principal
  - **altText**: Texto alternativo para accesibilidad

#### Notas Importantes

- Solo retorna arreglos con estado `activo`
- Solo retorna imágenes con `activo = true`
- Las imágenes están ordenadas por `orden` ascendente
- El array `media` puede estar vacío si no hay imágenes activas
- `formaArreglo` puede ser `null` si no está asociada

---

## 2. Lista de Flores para Filtros

### `GET /flor/public`

Obtiene la lista de flores activas disponibles para usar en los selectores/filtros de la landing page.

#### Parámetros

Ninguno. Este endpoint no acepta parámetros.

#### Ejemplo de Request

```http
GET /flor/public
```

#### Ejemplo de Response (200 OK)

```json
[
  {
    "idFlor": 1,
    "nombre": "Rosa",
    "color": "Rojo"
  },
  {
    "idFlor": 2,
    "nombre": "Rosa",
    "color": "Blanco"
  },
  {
    "idFlor": 3,
    "nombre": "Tulipán",
    "color": "Amarillo"
  },
  {
    "idFlor": 4,
    "nombre": "Girasol",
    "color": "Amarillo"
  }
]
```

#### Estructura de la Respuesta

- **idFlor**: ID único de la flor
- **nombre**: Nombre de la flor
- **color**: Color de la flor

#### Notas Importantes

- Solo retorna flores con estado `activo`
- Está ordenado alfabéticamente por nombre
- Solo incluye los campos necesarios para los filtros (no incluye precio ni tipo)

---

## 3. Lista de Accesorios para Filtros

### `GET /accesorio/public`

Obtiene la lista de accesorios activos disponibles para usar en los selectores/filtros de la landing page.

#### Parámetros

Ninguno. Este endpoint no acepta parámetros.

#### Ejemplo de Request

```http
GET /accesorio/public
```

#### Ejemplo de Response (200 OK)

```json
[
  {
    "idAccesorio": 1,
    "descripcion": "Cinta decorativa roja",
    "categoria": "Decoración"
  },
  {
    "idAccesorio": 2,
    "descripcion": "Tarjeta personalizada",
    "categoria": "Personalización"
  },
  {
    "idAccesorio": 3,
    "descripcion": "Vaso de cristal",
    "categoria": "Contenedor"
  }
]
```

#### Estructura de la Respuesta

- **idAccesorio**: ID único del accesorio
- **descripcion**: Descripción del accesorio
- **categoria**: Categoría del accesorio

#### Notas Importantes

- Solo retorna accesorios con estado `activo`
- Está ordenado alfabéticamente por descripción
- Solo incluye los campos necesarios para los filtros (no incluye precio)

---

## 4. Opciones de Filtros Disponibles

### `GET /catalogo/filtros`

Obtiene todas las opciones de filtros disponibles para el catálogo (formas de arreglo, rango de precios, y flores disponibles).

**Nota**: Este endpoint requiere autenticación (`@Auth()`), pero puede ser útil para el frontend si se implementa autenticación en la landing page.

---

## Ejemplos de Uso en el Frontend

### Ejemplo 1: Cargar catálogo inicial

```typescript
// Cargar arreglos con paginación
const response = await fetch('/api/arreglos/public?limit=12&offset=0');
const arreglos = await response.json();

// Mostrar arreglos en la UI
arreglos.forEach(arreglo => {
  const imagenPrincipal = arreglo.media.find(m => m.isPrimary) || arreglo.media[0];
  // Renderizar tarjeta con imagenPrincipal.url, arreglo.nombre, arreglo.precioUnitario
});
```

### Ejemplo 2: Filtrar por flores

```typescript
// Obtener lista de flores para el selector
const floresResponse = await fetch('/api/flor/public');
const flores = await floresResponse.json();

// Cuando el usuario selecciona flores (ej: [1, 2, 3])
const floresIds = [1, 2, 3];
const queryParams = new URLSearchParams({
  flores: floresIds.join(','),
  limit: '12',
  offset: '0'
});

const arreglosResponse = await fetch(`/api/arreglos/public?${queryParams}`);
const arreglosFiltrados = await arreglosResponse.json();
```

### Ejemplo 3: Búsqueda con múltiples filtros

```typescript
const filters = {
  q: 'romántico',
  precioMin: 100,
  precioMax: 300,
  idFormaArreglo: 1,
  ordenarPor: 'precio',
  orden: 'ASC',
  limit: 12,
  offset: 0
};

const queryParams = new URLSearchParams(
  Object.entries(filters).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key] = String(value);
    }
    return acc;
  }, {})
);

const response = await fetch(`/api/arreglos/public?${queryParams}`);
const resultados = await response.json();
```

### Ejemplo 4: Paginación

```typescript
const page = 1;
const itemsPerPage = 12;
const offset = (page - 1) * itemsPerPage;

const response = await fetch(
  `/api/arreglos/public?limit=${itemsPerPage}&offset=${offset}`
);
const arreglos = await response.json();
```

---

## Manejo de Errores

Todos los endpoints públicos retornan códigos de estado HTTP estándar:

- **200 OK**: Solicitud exitosa
- **400 Bad Request**: Parámetros inválidos
- **500 Internal Server Error**: Error del servidor

### Ejemplo de Error

```json
{
  "statusCode": 400,
  "message": "ordenarPor debe ser uno de: nombre, precio, fechaCreacion",
  "error": "Bad Request"
}
```

---

## Consideraciones de Rendimiento

1. **Paginación**: Siempre usa `limit` y `offset` para evitar cargar demasiados datos
2. **Caché**: Considera cachear las respuestas de `/flor/public` y `/accesorio/public` ya que cambian poco
3. **Lazy Loading**: Carga las imágenes de forma diferida (lazy loading) para mejorar el rendimiento
4. **Filtros**: Aplica los filtros en el servidor, no en el cliente, para reducir la cantidad de datos transferidos

---

## Diferencias con Endpoints Autenticados

Los endpoints públicos (`/public`) tienen las siguientes diferencias con respecto a los endpoints autenticados:

1. **No requieren autenticación**: No necesitas enviar tokens de autenticación
2. **Datos limitados**: Solo retornan la información necesaria para mostrar en la landing page
3. **Solo activos**: Solo retornan elementos con estado `activo`
4. **Sin relaciones internas**: No incluyen relaciones internas del sistema (carritos, pedidos, facturas, etc.)

---

## Soporte

Si tienes preguntas o encuentras problemas con estos endpoints, contacta al equipo de backend.


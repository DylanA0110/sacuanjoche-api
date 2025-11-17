# Guía de Integración de Pagos - Frontend

Esta guía explica cómo integrar los pagos en el frontend, tanto para PayPal (canal web) como para métodos de pago del canal interno (efectivo, tarjeta, etc.).

## 📋 Flujos Disponibles

### Flujo 1: PayPal (Canal WEB) - Pago Online
1. **Crear pago con PayPal** → Obtener URL de aprobación
2. **Redirigir usuario a PayPal** → Usuario aprueba el pago
3. **Confirmar pago** → Cambiar estado a PAGADO
4. **Crear pedido** → Asociar el pedido al pago completado

### Flujo 2: Canal INTERNO - Pago en Tienda
1. **Crear pedido** (opcional: con pago pendiente o sin pago)
2. **Crear pago** (efectivo, tarjeta, etc.) → Puede ser antes o después del pedido
3. **Asociar pago al pedido** (si se creó después)

---

## 🔄 Flujo 1: PayPal (Canal WEB)

---

## 🔄 Flujo Detallado Paso a Paso

### Paso 1: Crear el Pago con PayPal

Cuando el usuario está en el checkout y selecciona PayPal como método de pago:

```typescript
// Ejemplo en React/TypeScript
const crearPagoPayPal = async (monto: number, idMetodoPago: number) => {
  try {
    const response = await fetch(`${API_URL}/api/pago/paypal/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Agregar token de autenticación si es necesario
      },
      body: JSON.stringify({
        idMetodoPago: idMetodoPago, // ID del método de pago PayPal (ej: 1)
        monto: monto, // Monto total del pedido (ej: 150.50)
        // NO incluir idPedido - el pedido aún no existe
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear pago con PayPal');
    }

    const data = await response.json();
    
    // Guardar el idPago en localStorage o estado para usarlo después
    localStorage.setItem('paypal_pago_id', data.idPago);
    
    // Redirigir al usuario a PayPal
    window.location.href = data.paypalApprovalUrl;
    
    return data;
  } catch (error) {
    console.error('Error al crear pago PayPal:', error);
    throw error;
  }
};
```

**Respuesta del servidor:**
```json
{
  "idPago": 123,
  "paypalApprovalUrl": "https://www.sandbox.paypal.com/checkoutnow?token=...",
  "estado": "pendiente",
  "monto": 150.50,
  "idGateway": "5O190127TN364715T",
  "gateway": "PAYPAL"
}
```

**⚠️ IMPORTANTE:**
- Guarda el `idPago` en localStorage o estado, lo necesitarás después
- NO incluyas `idPedido` en el request (el pedido aún no existe)
- El `paypalApprovalUrl` es la URL a la que debes redirigir al usuario

---

### Paso 2: Usuario Aprueba en PayPal

PayPal redirigirá al usuario de vuelta a tu aplicación usando las URLs configuradas:

- **URL de éxito:** `${FRONTEND_URL}/payment/success?token=ORDER_ID&PayerID=PAYER_ID`
- **URL de cancelación:** `${FRONTEND_URL}/payment/cancel`

**Configuración en PayPal Service:**
- `return_url`: `${FRONTEND_URL}/payment/success`
- `cancel_url`: `${FRONTEND_URL}/payment/cancel`

---

### Paso 3: Página de Éxito - Confirmar el Pago

Cuando el usuario regresa de PayPal después de aprobar:

```typescript
// En tu página /payment/success
import { useSearchParams } from 'react-router-dom'; // o el router que uses

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Este es el orderId de PayPal
  const idPago = localStorage.getItem('paypal_pago_id');

  useEffect(() => {
    const confirmarPago = async () => {
      if (!idPago || !token) {
        // Redirigir a error si faltan datos
        window.location.href = '/payment/error';
        return;
      }

      try {
        // Confirmar el pago en el backend
        const response = await fetch(
          `${API_URL}/api/pago/paypal/confirm/${idPago}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: token, // El token que viene de PayPal
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Error al confirmar pago');
        }

        const pagoConfirmado = await response.json();
        
        // El pago ahora está en estado PAGADO
        // Ahora puedes crear el pedido
        await crearPedido(pagoConfirmado.idPago);
        
      } catch (error) {
        console.error('Error al confirmar pago:', error);
        // Mostrar error al usuario
        // Redirigir a página de error
      }
    };

    confirmarPago();
  }, [idPago, token]);

  return (
    <div>
      <h1>Procesando tu pago...</h1>
      <p>Por favor espera mientras confirmamos tu pago.</p>
    </div>
  );
};
```

**Respuesta del servidor al confirmar:**
```json
{
  "idPago": 123,
  "estado": "pagado",
  "monto": 150.50,
  "referencia": "PayPal Order: 5O190127TN364715T",
  "metodoPago": { ... }
}
```

---

### Paso 4: Crear el Pedido

Una vez que el pago está confirmado (estado `PAGADO`), crea el pedido:

```typescript
const crearPedido = async (idPago: number) => {
  try {
    const response = await fetch(`${API_URL}/api/pedido`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idPago: idPago, // El ID del pago que ya está PAGADO
        idEmpleado: 1, // ID del empleado
        idCliente: clienteId, // ID del cliente
        idDireccion: direccionId, // ID de la dirección
        idContactoEntrega: contactoId, // ID del contacto
        canal: 'web', // Canal del pedido
        fechaEntregaEstimada: '2024-12-25T10:00:00.000Z',
        direccionTxt: 'Calle 123 #45-67, Barrio Centro',
        costoEnvio: 25.00,
        // totalPedido y totalProductos se calcularán automáticamente
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear pedido');
    }

    const pedido = await response.json();
    
    // Limpiar localStorage
    localStorage.removeItem('paypal_pago_id');
    
    // Redirigir a página de confirmación de pedido
    window.location.href = `/pedido/${pedido.idPedido}/confirmacion`;
    
    return pedido;
  } catch (error) {
    console.error('Error al crear pedido:', error);
    throw error;
  }
};
```

---

## 🚫 Manejo de Cancelación

Si el usuario cancela el pago en PayPal:

```typescript
// En tu página /payment/cancel
const PaymentCancelPage = () => {
  const idPago = localStorage.getItem('paypal_pago_id');

  useEffect(() => {
    // Limpiar localStorage
    localStorage.removeItem('paypal_pago_id');
    
    // Opcional: Mostrar mensaje al usuario
    // Opcional: Ofrecer reintentar el pago
  }, []);

  return (
    <div>
      <h1>Pago Cancelado</h1>
      <p>El pago fue cancelado. Puedes intentar nuevamente.</p>
      <button onClick={() => window.location.href = '/checkout'}>
        Volver al Checkout
      </button>
    </div>
  );
};
```

---

## 📝 Ejemplo Completo de Integración

```typescript
// Componente de Checkout completo
import { useState } from 'react';

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayPalCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Obtener el monto total del carrito
      const montoTotal = calcularMontoTotal(); // Tu función
      const idMetodoPago = 1; // ID del método PayPal en tu BD

      // 2. Crear pago con PayPal
      const response = await fetch(`${API_URL}/api/pago/paypal/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Si usas autenticación
        },
        body: JSON.stringify({
          idMetodoPago: idMetodoPago,
          monto: montoTotal,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear pago');
      }

      const pagoData = await response.json();

      // 3. Guardar idPago para usarlo después
      localStorage.setItem('paypal_pago_id', pagoData.idPago.toString());

      // 4. Redirigir a PayPal
      window.location.href = pagoData.paypalApprovalUrl;

    } catch (err: any) {
      setError(err.message || 'Error al procesar el pago');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {error && <div className="error">{error}</div>}
      
      <button 
        onClick={handlePayPalCheckout}
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Pagar con PayPal'}
      </button>
    </div>
  );
};
```

---

## 🔄 Flujo 2: Canal INTERNO (Efectivo, Tarjeta, etc.)

Para pedidos del canal interno (tienda física), el flujo es más flexible:

### Opción A: Crear Pago Primero, Luego Pedido

```typescript
// 1. Crear pago (efectivo, tarjeta, etc.)
const crearPagoInterno = async (monto: number, idMetodoPago: number) => {
  const response = await fetch(`${API_URL}/api/pago`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idMetodoPago: idMetodoPago, // ID del método (efectivo, tarjeta, etc.)
      monto: monto,
      estado: 'pagado', // Puede ser 'pagado' o 'pendiente'
      referencia: 'Pago en efectivo', // Opcional
      gateway: null, // No es PayPal
    }),
  });

  const pago = await response.json();
  return pago;
};

// 2. Crear pedido con el pago
const crearPedidoInterno = async (idPago: number) => {
  const response = await fetch(`${API_URL}/api/pedido`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idPago: idPago, // Pago ya creado
      idEmpleado: 1,
      idCliente: 1,
      idDireccion: 1,
      idContactoEntrega: 1,
      canal: 'interno', // IMPORTANTE: canal interno
      fechaEntregaEstimada: '2024-12-25T10:00:00.000Z',
      direccionTxt: 'Calle 123 #45-67',
      costoEnvio: 0, // Puede ser 0 para entregas en tienda
    }),
  });

  return response.json();
};
```

### Opción B: Crear Pedido Primero, Luego Pago

```typescript
// 1. Crear pedido sin pago (o con pago pendiente)
const crearPedidoSinPago = async () => {
  const response = await fetch(`${API_URL}/api/pedido`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // NO incluir idPago
      idEmpleado: 1,
      idCliente: 1,
      idDireccion: 1,
      idContactoEntrega: 1,
      canal: 'interno', // IMPORTANTE: canal interno
      fechaEntregaEstimada: '2024-12-25T10:00:00.000Z',
      direccionTxt: 'Calle 123 #45-67',
      costoEnvio: 0,
    }),
  });

  return response.json();
};

// 2. Crear pago después
const crearPagoDespues = async (monto: number, idMetodoPago: number) => {
  const response = await fetch(`${API_URL}/api/pago`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idMetodoPago: idMetodoPago,
      monto: monto,
      estado: 'pagado',
      referencia: 'Pago recibido en tienda',
    }),
  });

  return response.json();
};

// 3. Asociar pago al pedido
const asociarPagoAlPedido = async (idPedido: number, idPago: number) => {
  const response = await fetch(
    `${API_URL}/api/pedido/${idPedido}/asociar-pago`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idPago: idPago,
      }),
    }
  );

  return response.json();
};
```

### Opción C: Crear Pedido y Pago Juntos

```typescript
// 1. Crear pago
const pago = await crearPagoInterno(150.50, 2); // Método efectivo

// 2. Crear pedido con el pago
const pedido = await crearPedidoInterno(pago.idPago);
```

---

## 📊 Comparación de Flujos

| Aspecto | Canal WEB (PayPal) | Canal INTERNO |
|---------|-------------------|---------------|
| **Pago obligatorio** | ✅ Sí, debe estar PAGADO | ❌ No, es opcional |
| **Orden** | Pago → Confirmar → Pedido | Pedido y Pago (cualquier orden) |
| **Estado inicial pago** | PENDIENTE → PAGADO | PAGADO o PENDIENTE |
| **Métodos de pago** | Solo PayPal | Efectivo, Tarjeta, etc. |
| **Validación** | Pago debe estar PAGADO | Pago puede estar PENDIENTE |

---

## 🔍 Endpoints Disponibles

### 1. Crear Pago con PayPal
```
POST /api/pago/paypal/create
```

**Body:**
```json
{
  "idMetodoPago": 1,
  "monto": 150.50
}
```

**Respuesta:**
```json
{
  "idPago": 123,
  "paypalApprovalUrl": "https://www.sandbox.paypal.com/...",
  "estado": "pendiente",
  "monto": 150.50,
  "idGateway": "5O190127TN364715T"
}
```

### 2. Confirmar Pago
```
POST /api/pago/paypal/confirm/:idPago
```

**Body:**
```json
{
  "orderId": "5O190127TN364715T"
}
```

**Respuesta:**
```json
{
  "idPago": 123,
  "estado": "pagado",
  "monto": 150.50,
  "referencia": "PayPal Order: 5O190127TN364715T"
}
```

### 3. Crear Pago (Canal Interno)
```
POST /api/pago
```

**Body (Canal Interno):**
```json
{
  "idMetodoPago": 2,
  "monto": 150.50,
  "estado": "pagado",
  "referencia": "Pago en efectivo",
  "gateway": null
}
```

**Respuesta:**
```json
{
  "idPago": 124,
  "estado": "pagado",
  "monto": 150.50,
  "referencia": "Pago en efectivo",
  "metodoPago": { ... }
}
```

### 4. Crear Pedido
```
POST /api/pedido
```

**Body (Canal WEB - requiere pago PAGADO):**
```json
{
  "idPago": 123,
  "idEmpleado": 1,
  "idCliente": 1,
  "idDireccion": 1,
  "idContactoEntrega": 1,
  "canal": "web",
  "fechaEntregaEstimada": "2024-12-25T10:00:00.000Z",
  "direccionTxt": "Calle 123 #45-67",
  "costoEnvio": 25.00
}
```

**Body (Canal INTERNO - pago opcional):**
```json
{
  "idPago": 124,
  "idEmpleado": 1,
  "idCliente": 1,
  "idDireccion": 1,
  "idContactoEntrega": 1,
  "canal": "interno",
  "fechaEntregaEstimada": "2024-12-25T10:00:00.000Z",
  "direccionTxt": "Calle 123 #45-67",
  "costoEnvio": 0
}
```

### 5. Asociar Pago a Pedido (Canal Interno)
```
POST /api/pedido/:idPedido/asociar-pago
```

**Body:**
```json
{
  "idPago": 124
}
```

**Respuesta:**
```json
{
  "idPedido": 10,
  "idPago": 124,
  "estado": "procesando",
  ...
}
```

---

## ⚠️ Puntos Importantes

### Para Canal WEB (PayPal):

1. **Orden del flujo:**
   - ✅ Crear pago → Confirmar pago → Crear pedido
   - ❌ NO crear pedido antes de confirmar el pago

2. **Estado del pago:**
   - `PENDIENTE`: Pago creado, esperando aprobación en PayPal
   - `PAGADO`: Pago confirmado, listo para crear pedido

3. **Validaciones del backend:**
   - El pedido solo se puede crear con un pago en estado `PAGADO`
   - El pago no puede confirmarse si ya tiene un pedido asociado
   - El `orderId` debe coincidir con el guardado en el pago
   - El método de pago debe ser compatible con canal WEB

### Para Canal INTERNO:

1. **Orden del flujo:**
   - ✅ Opción 1: Crear pago → Crear pedido
   - ✅ Opción 2: Crear pedido → Crear pago → Asociar
   - ✅ Opción 3: Crear pedido sin pago (pago pendiente)

2. **Estado del pago:**
   - `PAGADO`: Pago completado (efectivo, tarjeta, etc.)
   - `PENDIENTE`: Pago pendiente (puede asociarse al pedido)

3. **Validaciones del backend:**
   - El pago puede estar en estado `PENDIENTE` o `PAGADO`
   - El pedido puede crearse sin pago (pago opcional)
   - Si el pago está `PAGADO`, el pedido se crea en estado `PROCESANDO`
   - Si el pago está `PENDIENTE`, el pedido se crea en estado `PENDIENTE`

### General:

4. **Manejo de errores:**
   - Siempre maneja errores de red
   - Valida que el pago esté en estado correcto antes de crear el pedido
   - Limpia localStorage en caso de error o cancelación (solo PayPal)

5. **Variables de entorno necesarias (solo para PayPal):**
   - `FRONTEND_URL`: URL de tu frontend (para redirects de PayPal)
   - `PAYPAL_CLIENT_ID`: Client ID de PayPal
   - `PAYPAL_CLIENT_SECRET`: Client Secret de PayPal
   - `PAYPAL_MODE`: `sandbox` o `live`

---

## 🧪 Testing

### PayPal (Sandbox):

Para probar en el entorno de sandbox de PayPal:

1. Crea una cuenta de desarrollador en [PayPal Developer](https://developer.paypal.com/)
2. Crea una aplicación y obtén las credenciales
3. Usa cuentas de prueba de PayPal para simular pagos
4. Configura `PAYPAL_MODE=sandbox` en el backend

### Canal Interno:

Para probar pagos del canal interno:

1. Asegúrate de tener métodos de pago creados en la BD:
   ```sql
   -- Ejemplo: Efectivo
   INSERT INTO metodo_pago (descripcion, tipo, canales_disponibles, estado)
   VALUES ('Efectivo', 'efectivo', ARRAY['interno'], 'activo');
   
   -- Ejemplo: Tarjeta
   INSERT INTO metodo_pago (descripcion, tipo, canales_disponibles, estado)
   VALUES ('Tarjeta de Crédito', 'tarjeta', ARRAY['interno'], 'activo');
   ```

2. Puedes crear pagos directamente sin necesidad de integración externa
3. Los pagos pueden estar en estado `PAGADO` o `PENDIENTE`

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs del backend
2. Verifica que las variables de entorno estén configuradas
3. Asegúrate de que el método de pago PayPal esté activo en la BD
4. Verifica que las URLs de redirect estén correctamente configuradas


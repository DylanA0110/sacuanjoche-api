# Flujo Carrito → Pago → Pedido - Documentación para Frontend React

## Resumen del Flujo

Este documento describe el flujo completo para crear un pedido desde un carrito de compras, pasando por la creación y confirmación de un pago PayPal.

## Flujo Visual

```
1. Cliente agrega productos al carrito
   ↓
2. Cliente crea pago PayPal
   ↓
3. Cliente confirma pago en PayPal
   ↓
4. Cliente asocia pago al carrito
   ↓
5. Cliente crea pedido desde el carrito
```

---

## Endpoints Disponibles

### 1. Asociar Pago al Carrito

**Endpoint:** `POST /carrito/:idCarrito/asociar-pago/:idPago`

**Autenticación:** Requerida (Bearer Token)

**Roles permitidos:** `admin`, `cliente`

**Descripción:** Asocia un pago completado (estado `PAGADO`) a un carrito.

**Parámetros de URL:**
- `idCarrito` (number): ID del carrito
- `idPago` (number): ID del pago a asociar

**Respuesta exitosa (200):**
```json
{
  "idCarrito": 1,
  "idUser": "uuid-del-usuario",
  "idPago": 123,
  "fechaCreacion": "2024-12-20T10:00:00.000Z",
  "fechaUltAct": "2024-12-20T10:05:00.000Z",
  "estado": "activo",
  "user": { ... },
  "carritosArreglo": [ ... ],
  "pago": {
    "idPago": 123,
    "estado": "pagado",
    "monto": 150.00,
    ...
  }
}
```

**Errores posibles:**
- `404`: Carrito o pago no encontrado
- `400`: El pago no está completado o ya está asociado a otro carrito

---

### 2. Crear Pedido desde Carrito

**Endpoint:** `POST /carrito/:idCarrito/crear-pedido`

**Autenticación:** Requerida (Bearer Token)

**Roles permitidos:** `admin`, `cliente`

**Descripción:** Crea un pedido a partir de los productos en el carrito. El carrito debe tener un pago asociado y completado.

**Parámetros de URL:**
- `idCarrito` (number): ID del carrito

**Body (JSON):**
```json
{
  "idEmpleado": 1,
  "idDireccion": 1,
  "idContactoEntrega": 1,
  "idFolio": 1,
  "fechaEntregaEstimada": "2024-12-25T10:00:00.000Z",
  "direccionTxt": "Calle 123 #45-67, Barrio Centro, Ciudad"
}
```

**Campos requeridos:**
- `idEmpleado` (number): ID del empleado que maneja el pedido
- `idDireccion` (number): ID de la dirección de entrega
- `idContactoEntrega` (number): ID del contacto de entrega
- `idFolio` (number): ID del folio para generar el número de pedido
- `fechaEntregaEstimada` (string ISO 8601): Fecha estimada de entrega
- `direccionTxt` (string): Dirección de entrega en texto

**Respuesta exitosa (201):**
```json
{
  "idPedido": 1,
  "idEmpleado": 1,
  "idCliente": 1,
  "idDireccion": 1,
  "idContactoEntrega": 1,
  "idPago": 123,
  "idFolio": 1,
  "canal": "web",
  "estado": "procesando",
  "numeroPedido": "PED-00001",
  "totalProductos": 150.00,
  "totalPedido": 175.00,
  "fechaEntregaEstimada": "2024-12-25T10:00:00.000Z",
  "direccionTxt": "Calle 123 #45-67, Barrio Centro, Ciudad",
  "empleado": { ... },
  "cliente": { ... },
  "direccion": { ... },
  "contactoEntrega": { ... },
  "pago": { ... },
  "folio": { ... },
  "detallesPedido": [
    {
      "idDetallePedido": 1,
      "idPedido": 1,
      "idArreglo": 1,
      "cantidad": 2,
      "precioUnitario": 75.00,
      "subtotal": 150.00,
      "arreglo": { ... }
    }
  ]
}
```

**Errores posibles:**
- `404`: Carrito o entidades relacionadas no encontradas
- `400`: El carrito no tiene productos, no tiene pago asociado, o el pago no está completado

---

## Implementación en React

### Ejemplo de Hook Personalizado

```typescript
// hooks/useCarritoPedido.ts
import { useState } from 'react';
import { useAuth } from './useAuth'; // Tu hook de autenticación

interface CrearPedidoDesdeCarritoDto {
  idEmpleado: number;
  idDireccion: number;
  idContactoEntrega: number;
  idFolio: number;
  fechaEntregaEstimada: string;
  direccionTxt: string;
}

export const useCarritoPedido = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const asociarPago = async (idCarrito: number, idPago: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/carrito/${idCarrito}/asociar-pago/${idPago}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al asociar el pago');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const crearPedidoDesdeCarrito = async (
    idCarrito: number,
    datosPedido: CrearPedidoDesdeCarritoDto
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/carrito/${idCarrito}/crear-pedido`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(datosPedido),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el pedido');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    asociarPago,
    crearPedidoDesdeCarrito,
    loading,
    error,
  };
};
```

### Ejemplo de Componente de Checkout

```typescript
// components/Checkout.tsx
import React, { useState } from 'react';
import { useCarritoPedido } from '../hooks/useCarritoPedido';
import { usePagoPayPal } from '../hooks/usePagoPayPal'; // Tu hook para PayPal

interface CheckoutProps {
  carritoId: number;
  total: number;
  onPedidoCreado: (pedido: any) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  carritoId,
  total,
  onPedidoCreado,
}) => {
  const { asociarPago, crearPedidoDesdeCarrito, loading, error } = useCarritoPedido();
  const { crearPagoPayPal, confirmarPagoPayPal } = usePagoPayPal();
  const [pasoActual, setPasoActual] = useState<'pago' | 'asociar' | 'pedido'>('pago');
  const [idPago, setIdPago] = useState<number | null>(null);
  const [datosPedido, setDatosPedido] = useState({
    idEmpleado: 1,
    idDireccion: 1,
    idContactoEntrega: 1,
    idFolio: 1,
    fechaEntregaEstimada: '',
    direccionTxt: '',
  });

  // Paso 1: Crear pago PayPal
  const handleCrearPago = async () => {
    try {
      const pago = await crearPagoPayPal({
        idMetodoPago: 1, // ID del método de pago PayPal
        monto: total,
      });

      // Redirigir a PayPal
      if (pago.paypalApprovalUrl) {
        window.location.href = pago.paypalApprovalUrl;
      }
    } catch (err) {
      console.error('Error al crear el pago:', err);
    }
  };

  // Paso 2: Después de confirmar en PayPal, asociar el pago al carrito
  const handleAsociarPago = async (pagoId: number) => {
    try {
      setIdPago(pagoId);
      await asociarPago(carritoId, pagoId);
      setPasoActual('pedido');
    } catch (err) {
      console.error('Error al asociar el pago:', err);
    }
  };

  // Paso 3: Crear el pedido desde el carrito
  const handleCrearPedido = async () => {
    try {
      const pedido = await crearPedidoDesdeCarrito(carritoId, {
        ...datosPedido,
        fechaEntregaEstimada: new Date(datosPedido.fechaEntregaEstimada).toISOString(),
      });

      onPedidoCreado(pedido);
    } catch (err) {
      console.error('Error al crear el pedido:', err);
    }
  };

  return (
    <div className="checkout">
      {error && <div className="error">{error}</div>}

      {pasoActual === 'pago' && (
        <div>
          <h2>Paso 1: Realizar Pago</h2>
          <p>Total a pagar: ${total.toFixed(2)}</p>
          <button onClick={handleCrearPago} disabled={loading}>
            {loading ? 'Procesando...' : 'Pagar con PayPal'}
          </button>
        </div>
      )}

      {pasoActual === 'asociar' && idPago && (
        <div>
          <h2>Paso 2: Asociar Pago</h2>
          <p>Asociando el pago al carrito...</p>
          <button onClick={() => handleAsociarPago(idPago)} disabled={loading}>
            {loading ? 'Asociando...' : 'Continuar'}
          </button>
        </div>
      )}

      {pasoActual === 'pedido' && (
        <div>
          <h2>Paso 3: Crear Pedido</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleCrearPedido(); }}>
            <div>
              <label>Fecha de Entrega:</label>
              <input
                type="datetime-local"
                value={datosPedido.fechaEntregaEstimada}
                onChange={(e) =>
                  setDatosPedido({
                    ...datosPedido,
                    fechaEntregaEstimada: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>Dirección de Entrega:</label>
              <textarea
                value={datosPedido.direccionTxt}
                onChange={(e) =>
                  setDatosPedido({
                    ...datosPedido,
                    direccionTxt: e.target.value,
                  })
                }
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Creando pedido...' : 'Crear Pedido'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
```

### Ejemplo de Flujo Completo con Callback de PayPal

```typescript
// pages/CheckoutPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useCarritoPedido } from '../hooks/useCarritoPedido';
import { usePagoPayPal } from '../hooks/usePagoPayPal';

export const CheckoutPage: React.FC = () => {
  const { idCarrito } = useParams<{ idCarrito: string }>();
  const [searchParams] = useSearchParams();
  const { asociarPago, crearPedidoDesdeCarrito } = useCarritoPedido();
  const { confirmarPagoPayPal } = usePagoPayPal();
  const [estado, setEstado] = useState<'inicial' | 'pagando' | 'asociando' | 'creando' | 'completado'>('inicial');

  // Verificar si hay parámetros de retorno de PayPal
  useEffect(() => {
    const paymentId = searchParams.get('paymentId');
    const payerId = searchParams.get('PayerID');
    const token = searchParams.get('token');

    if (paymentId && payerId && token && idCarrito) {
      handleConfirmarPagoYAsociar(parseInt(paymentId), payerId, token);
    }
  }, [searchParams, idCarrito]);

  const handleConfirmarPagoYAsociar = async (
    paymentId: number,
    payerId: string,
    token: string
  ) => {
    try {
      setEstado('asociando');

      // Confirmar el pago en PayPal
      const pagoConfirmado = await confirmarPagoPayPal(paymentId, {
        orderId: token, // O el orderId que retorne PayPal
      });

      // Asociar el pago al carrito
      await asociarPago(parseInt(idCarrito!), pagoConfirmado.idPago);

      setEstado('creando');
    } catch (err) {
      console.error('Error al confirmar y asociar el pago:', err);
      setEstado('inicial');
    }
  };

  const handleCrearPedido = async (datosPedido: any) => {
    try {
      setEstado('creando');
      const pedido = await crearPedidoDesdeCarrito(
        parseInt(idCarrito!),
        datosPedido
      );
      setEstado('completado');
      return pedido;
    } catch (err) {
      console.error('Error al crear el pedido:', err);
      setEstado('asociando');
      throw err;
    }
  };

  return (
    <div>
      {estado === 'inicial' && <div>Iniciando proceso de pago...</div>}
      {estado === 'asociando' && <div>Asociando pago al carrito...</div>}
      {estado === 'creando' && (
        <FormularioPedido onSubmit={handleCrearPedido} />
      )}
      {estado === 'completado' && (
        <div>¡Pedido creado exitosamente!</div>
      )}
    </div>
  );
};
```

---

## Validaciones Importantes

### Antes de Asociar un Pago

1. ✅ El carrito debe existir
2. ✅ El pago debe existir
3. ✅ El pago debe estar en estado `PAGADO`
4. ✅ El pago no debe estar asociado a otro carrito

### Antes de Crear un Pedido

1. ✅ El carrito debe existir
2. ✅ El carrito debe tener productos (`carritosArreglo.length > 0`)
3. ✅ El carrito debe tener un pago asociado (`idPago !== null`)
4. ✅ El pago asociado debe estar en estado `PAGADO`
5. ✅ El pago no debe estar asociado a otro pedido
6. ✅ El usuario del carrito debe tener un cliente asociado
7. ✅ Todos los IDs de las entidades relacionadas deben existir y ser válidos

---

## Notas Importantes

1. **Cálculo Automático de Totales:**
   - El campo `total_linea` en `carritos_arreglo` se calcula automáticamente como `cantidad × precio_unitario` mediante hooks de TypeORM.
   - Los totales del pedido (`totalProductos` y `totalPedido`) se calculan automáticamente después de copiar los productos del carrito al detalle del pedido.

2. **Estado del Pedido:**
   - Los pedidos creados desde el carrito se crean con estado `PROCESANDO` porque ya tienen un pago completado.

3. **Canal del Pedido:**
   - Todos los pedidos creados desde el carrito se crean con canal `WEB`.

4. **Número de Pedido:**
   - El número de pedido se genera automáticamente usando el folio especificado en el DTO.

---

## Manejo de Errores

### Errores Comunes y Soluciones

1. **"El pago no está completado"**
   - **Causa:** Intentaste asociar un pago que no está en estado `PAGADO`.
   - **Solución:** Asegúrate de confirmar el pago en PayPal antes de asociarlo.

2. **"El carrito no tiene productos"**
   - **Causa:** Intentaste crear un pedido desde un carrito vacío.
   - **Solución:** Agrega productos al carrito antes de crear el pedido.

3. **"El carrito no tiene un pago asociado"**
   - **Causa:** Intentaste crear un pedido sin asociar un pago primero.
   - **Solución:** Asocia un pago al carrito antes de crear el pedido.

4. **"El pago ya está asociado a otro pedido"**
   - **Causa:** Intentaste crear un pedido con un pago que ya fue usado.
   - **Solución:** Cada pago solo puede usarse una vez. Crea un nuevo pago si es necesario.

---

## Ejemplo de Flujo Completo

```typescript
// Ejemplo completo de uso
const flujoCompleto = async () => {
  const carritoId = 1;
  const total = 150.00;

  // 1. Crear pago PayPal
  const pago = await crearPagoPayPal({
    idMetodoPago: 1,
    monto: total,
  });

  // 2. Redirigir a PayPal (esto se hace en el frontend)
  // window.location.href = pago.paypalApprovalUrl;

  // 3. Después de confirmar en PayPal, obtener el pago confirmado
  const pagoConfirmado = await confirmarPagoPayPal(pago.idPago, {
    orderId: 'ORDER_ID_FROM_PAYPAL',
  });

  // 4. Asociar el pago al carrito
  await asociarPago(carritoId, pagoConfirmado.idPago);

  // 5. Crear el pedido desde el carrito
  const pedido = await crearPedidoDesdeCarrito(carritoId, {
    idEmpleado: 1,
    idDireccion: 1,
    idContactoEntrega: 1,
    idFolio: 1,
    fechaEntregaEstimada: new Date('2024-12-25T10:00:00.000Z').toISOString(),
    direccionTxt: 'Calle 123 #45-67, Barrio Centro, Ciudad',
  });

  console.log('Pedido creado:', pedido);
};
```

---

## Preguntas Frecuentes

**P: ¿Puedo crear un pedido sin asociar un pago primero?**
R: No. El carrito debe tener un pago asociado y completado antes de crear el pedido.

**P: ¿Qué pasa si el carrito tiene productos pero no tiene pago asociado?**
R: Obtendrás un error 400 indicando que el carrito no tiene un pago asociado.

**P: ¿Puedo usar el mismo pago para múltiples pedidos?**
R: No. Cada pago solo puede asociarse a un carrito y usarse para crear un solo pedido.

**P: ¿Qué pasa con los productos del carrito después de crear el pedido?**
R: Los productos se copian al detalle del pedido, pero el carrito y sus productos permanecen en la base de datos. Puedes limpiar el carrito manualmente si lo deseas.

**P: ¿Cómo obtengo el ID del cliente desde el carrito?**
R: El cliente se obtiene automáticamente desde la relación `carrito.user.cliente`. No necesitas proporcionarlo en el DTO.

---

## Contacto

Si tienes preguntas o encuentras problemas, contacta al equipo de desarrollo.


/**
 * Archivo centralizado con todos los enums del sistema
 */

/**
 * Enum para los estados de un arreglo (articulo_arreglo)
 */
export enum ArregloEstado {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

/**
 * Enum para los estados de un artículo
 */
export enum ArticuloEstado {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

/**
 * Enum para los estados de un carrito
 */
export enum CarritoEstado {
  ACTIVO = 'activo',
  CERRADO = 'cerrado',
  EXPIRADO = 'expirado',
}

/**
 * Enum para los estados de una categoría
 */
export enum CategoriaEstado {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

/**
 * Enum para los estados de un cliente
 */
export enum ClienteEstado {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

/**
 * Enum para los estados de un empleado
 */
export enum EmpleadoEstado {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

/**
 * Enum para los estados de una factura
 */
export enum FacturaEstado {
  PENDIENTE = 'pendiente',
  PAGADO = 'pagado',
  ANULADA = 'anulada',
}

/**
 * Enum para los estados de un método de pago
 */
export enum MetodoPagoEstado {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

/**
 * Enum para identificar el tipo de método de pago
 */
export enum MetodoPagoTipo {
  /**
   * Métodos de pago online (PayPal, Stripe, etc.)
   * Solo disponibles en canal WEB
   */
  ONLINE = 'online',

  /**
   * Métodos de pago en efectivo
   * Solo disponibles en canal INTERNO
   */
  EFECTIVO = 'efectivo',

  /**
   * Métodos de pago con tarjeta física (POS, terminal)
   * Solo disponibles en canal INTERNO
   */
  TARJETA_FISICA = 'tarjeta_fisica',

  /**
   * Métodos de pago mixtos (disponibles en ambos canales)
   * Ejemplo: Tarjeta de crédito que puede ser online o física
   */
  MIXTO = 'mixto',
}

/**
 * Enum para los estados de un pago
 */
export enum PagoEstado {
  PENDIENTE = 'pendiente',
  PAGADO = 'pagado',
  FALLIDO = 'fallido',
  REEMBOLSADO = 'reembolsado',
}

/**
 * Enum para identificar el canal de venta de un pedido
 */
export enum PedidoCanal {
  /**
   * Pedido realizado desde la landing page (web)
   * Requiere pago completado antes de crear el pedido
   */
  WEB = 'web',

  /**
   * Pedido realizado en la tienda física (interno)
   * Permite crear pedido sin pago o con pago pendiente
   */
  INTERNO = 'interno',
}

/**
 * Enum para los estados de un pedido
 */
export enum PedidoEstado {
  PENDIENTE = 'pendiente',
  PROCESANDO = 'procesando',
  EN_ENVIO = 'en_envio',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado',
}

/**
 * Enum para los estados de un usuario
 */
export enum UserEstado {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

/**
 * Enum para estados activo/inactivo genérico
 */
export enum EstadoActivo {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

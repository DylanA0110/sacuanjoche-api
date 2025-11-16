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


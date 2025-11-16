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


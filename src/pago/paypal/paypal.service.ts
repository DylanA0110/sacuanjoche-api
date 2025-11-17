import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PayPalService {
  private readonly logger = new Logger(PayPalService.name);
  private client: paypal.core.PayPalHttpClient;

  constructor(private readonly configService: ConfigService) {
    const environment = this.getEnvironment();
    const clientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    const clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      this.logger.warn(
        'PayPal credentials not configured. PayPal functionality will be disabled.',
      );
      this.client = null as any;
    } else {
      this.client = new paypal.core.PayPalHttpClient(environment);
      this.logger.log('PayPal service initialized successfully');
    }
  }

  private getEnvironment(): paypal.core.Environment {
    const mode = this.configService.get<string>('PAYPAL_MODE', 'sandbox');
    const clientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    const clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      throw new Error('PayPal credentials not configured');
    }

    if (mode === 'live') {
      return new paypal.core.LiveEnvironment(clientId, clientSecret);
    }
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  }

  /**
   * Crea una orden de pago en PayPal
   */
  async createOrder(
    amount: number,
    currency: string = 'USD',
    description?: string,
  ) {
    if (!this.client) {
      throw new BadRequestException(
        'PayPal no está configurado. Configura PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET.',
      );
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: description || 'Pago de pedido',
        },
      ],
      application_context: {
        brand_name: this.configService.get<string>('PAYPAL_BRAND_NAME') || 'Tu Empresa',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${this.configService.get('FRONTEND_URL') || 'http://localhost:5173'}/payment/success`,
        cancel_url: `${this.configService.get('FRONTEND_URL') || 'http://localhost:5173'}/payment/cancel`,
      },
    });

    try {
      const response = await this.client.execute(request);
      return {
        orderId: response.result.id,
        approvalUrl: response.result.links.find((link) => link.rel === 'approve')
          ?.href,
        status: response.result.status,
      };
    } catch (error: any) {
      this.logger.error('Error creating PayPal order', {
        error: error.message,
        stack: error.stack,
      });
      throw new BadRequestException(
        `Error creating PayPal order: ${error.message || 'Unknown error'}`,
      );
    }
  }

  /**
   * Captura un pago después de que el usuario aprueba la orden
   */
  async captureOrder(orderId: string) {
    if (!this.client) {
      throw new BadRequestException(
        'PayPal no está configurado. Configura PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET.',
      );
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
      const response = await this.client.execute(request);
      return {
        orderId: response.result.id,
        status: response.result.status,
        payer: response.result.payer,
        purchaseUnits: response.result.purchase_units,
        captureId:
          response.result.purchase_units[0]?.payments?.captures[0]?.id,
        amount:
          response.result.purchase_units[0]?.payments?.captures[0]?.amount
            ?.value,
      };
    } catch (error: any) {
      this.logger.error('Error capturing PayPal order', {
        error: error.message,
        stack: error.stack,
        orderId,
      });
      throw new BadRequestException(
        `Error capturing PayPal order: ${error.message || 'Unknown error'}`,
      );
    }
  }

  /**
   * Obtiene los detalles de una orden
   */
  async getOrder(orderId: string) {
    if (!this.client) {
      throw new BadRequestException(
        'PayPal no está configurado. Configura PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET.',
      );
    }

    const request = new paypal.orders.OrdersGetRequest(orderId);

    try {
      const response = await this.client.execute(request);
      return response.result;
    } catch (error: any) {
      this.logger.error('Error getting PayPal order', {
        error: error.message,
        stack: error.stack,
        orderId,
      });
      throw new BadRequestException(
        `Error getting PayPal order: ${error.message || 'Unknown error'}`,
      );
    }
  }

  /**
   * Reembolsa un pago capturado
   */
  async refundPayment(
    captureId: string,
    amount?: number,
    currency: string = 'USD',
  ) {
    if (!this.client) {
      throw new BadRequestException(
        'PayPal no está configurado. Configura PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET.',
      );
    }

    const request = new paypal.payments.CapturesRefundRequest(captureId);

    if (amount) {
      request.requestBody({
        amount: {
          currency_code: currency,
          value: amount.toFixed(2),
        },
      });
    } else {
      request.requestBody({});
    }

    try {
      const response = await this.client.execute(request);
      return response.result;
    } catch (error: any) {
      this.logger.error('Error refunding PayPal payment', {
        error: error.message,
        stack: error.stack,
        captureId,
      });
      throw new BadRequestException(
        `Error refunding PayPal payment: ${error.message || 'Unknown error'}`,
      );
    }
  }
}


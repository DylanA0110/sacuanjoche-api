import { Pedido } from '../../pedido/entities/pedido.entity';
import { MetodoPago } from '../../metodo-pago/entities/metodo-pago.entity';
export declare class Pago {
    idPago: number;
    idPedido: number;
    idMetodoPago: number;
    monto: number;
    estado: string;
    fechaPago: Date;
    referencia: string;
    gateway: string;
    idGateway: string;
    paymentUrlExt: string;
    rawPayload: string;
    pedido: Pedido;
    metodoPago: MetodoPago;
}

export declare class CreatePagoDto {
    idPedido: number;
    idMetodoPago: number;
    monto: number;
    estado: string;
    referencia?: string;
    gateway?: string;
    idGateway?: string;
    paymentUrlExt?: string;
    rawPayload?: string;
}

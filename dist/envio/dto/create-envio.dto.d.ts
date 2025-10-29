export declare class CreateEnvioDto {
    idPedido: number;
    idEmpleado: number;
    estadoEnvio: string;
    fechaProgramada: string;
    fechaSalida?: string;
    fechaEntrega?: string;
    origenLat: number;
    origenLng: number;
    destinoLat: number;
    destinoLng: number;
    costoEnvio: number;
    observaciones?: string;
}

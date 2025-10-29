import { Pedido } from '../../pedido/entities/pedido.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
export declare class Envio {
    idEnvio: number;
    idPedido: number;
    idEmpleado: number;
    estadoEnvio: string;
    fechaProgramada: Date;
    fechaSalida: Date;
    fechaEntrega: Date;
    origenLat: number;
    origenLng: number;
    destinoLat: number;
    destinoLng: number;
    costoEnvio: number;
    observaciones: string;
    pedido: Pedido;
    empleado: Empleado;
}

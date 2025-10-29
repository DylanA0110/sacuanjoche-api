import { Pedido } from '../../pedido/entities/pedido.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
export declare class PedidoHistorial {
    idPedidoHistorial: number;
    idPedido: number;
    idEmpleado: number;
    estado: string;
    fechaCambio: Date;
    nota: string;
    pedido: Pedido;
    empleado: Empleado;
}

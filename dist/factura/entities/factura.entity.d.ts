import { Pedido } from '../../pedido/entities/pedido.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
export declare class Factura {
    idFactura: number;
    idPedido: number;
    idEmpleado: number;
    numFactura: string;
    fechaEmision: Date;
    estado: string;
    montoTotal: number;
    pedido: Pedido;
    empleado: Empleado;
}

import { Pedido } from '../../pedido/entities/pedido.entity';
import { Envio } from '../../envio/entities/envio.entity';
import { Factura } from '../../factura/entities/factura.entity';
import { User } from '../../user/entities/user.entity';
import { PedidoHistorial } from '../../pedido-historial/entities/pedido-historial.entity';
export declare class Empleado {
    idEmpleado: number;
    primerNombre: string;
    primerApellido: string;
    segundoApellido: string;
    sexo: string;
    telefono: string;
    fechaNac: Date;
    activo: boolean;
    fechaCreacion: Date;
    pedidos: Pedido[];
    envios: Envio[];
    facturas: Factura[];
    users: User[];
    pedidosHistorial: PedidoHistorial[];
}

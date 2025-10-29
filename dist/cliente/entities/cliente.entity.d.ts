import { User } from '../../user/entities/user.entity';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { ClienteDireccion } from '../../cliente-direccion/entities/cliente-direccion.entity';
export declare class Cliente {
    idCliente: number;
    primerNombre: string;
    primerApellido: string;
    telefono: string;
    activo: boolean;
    fechaCreacion: Date;
    user: User;
    pedidos: Pedido[];
    direcciones: ClienteDireccion[];
}

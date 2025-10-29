import { Pedido } from '../../pedido/entities/pedido.entity';
export declare class ContactoEntrega {
    idContactoEntrega: number;
    nombre: string;
    apellido: string;
    telefono: string;
    pedidos: Pedido[];
}

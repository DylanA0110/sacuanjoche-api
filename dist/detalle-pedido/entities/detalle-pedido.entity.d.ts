import { Pedido } from '../../pedido/entities/pedido.entity';
import { Arreglo } from '../../arreglo/entities/arreglo.entity';
export declare class DetallePedido {
    idDetallePedido: number;
    idPedido: number;
    idArreglo: number;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
    pedido: Pedido;
    arreglo: Arreglo;
}

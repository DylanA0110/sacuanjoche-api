import { Carrito } from '../../carrito/entities/carrito.entity';
import { Arreglo } from '../../arreglo/entities/arreglo.entity';
export declare class CarritosArreglo {
    idCarritoArreglo: number;
    idCarrito: number;
    idArreglo: number;
    cantidad: number;
    precioUnitario: number;
    totalLinea: number;
    carrito: Carrito;
    arreglo: Arreglo;
}

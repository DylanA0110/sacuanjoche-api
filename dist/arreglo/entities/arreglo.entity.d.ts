import { FormaArreglo } from '../../forma-arreglo/entities/forma-arreglo.entity';
import { ArregloFlor } from '../../arreglo-flor/entities/arreglo-flor.entity';
import { AccesoriosArreglo } from '../../accesorios-arreglo/entities/accesorios-arreglo.entity';
import { CarritosArreglo } from '../../carritos-arreglo/entities/carritos-arreglo.entity';
import { DetallePedido } from '../../detalle-pedido/entities/detalle-pedido.entity';
export declare class Arreglo {
    idArreglo: number;
    idFormaArreglo: number;
    nombre: string;
    descripcion: string;
    precioUnitario: number;
    cantidadFlores: number;
    activo: boolean;
    fechaCreacion: Date;
    formaArreglo: FormaArreglo;
    arreglosFlor: ArregloFlor[];
    accesoriosArreglo: AccesoriosArreglo[];
    carritosArreglo: CarritosArreglo[];
    detallesPedido: DetallePedido[];
}

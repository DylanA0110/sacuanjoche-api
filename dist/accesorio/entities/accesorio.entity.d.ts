import { AccesoriosArreglo } from '../../accesorios-arreglo/entities/accesorios-arreglo.entity';
export declare class Accesorio {
    idAccesorio: number;
    descripcion: string;
    precioUnitario: number;
    activo: boolean;
    categoria: string;
    accesoriosArreglo: AccesoriosArreglo[];
}

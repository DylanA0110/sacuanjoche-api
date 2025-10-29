import { User } from '../../user/entities/user.entity';
import { CarritosArreglo } from '../../carritos-arreglo/entities/carritos-arreglo.entity';
export declare class Carrito {
    idCarrito: number;
    idUser: number;
    fechaCreacion: Date;
    fechaUltAct: Date;
    activo: boolean;
    user: User;
    carritosArreglo: CarritosArreglo[];
}

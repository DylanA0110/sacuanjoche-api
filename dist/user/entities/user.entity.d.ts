import { Empleado } from '../../empleado/entities/empleado.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Carrito } from '../../carrito/entities/carrito.entity';
export declare class User {
    idUser: number;
    idEmpleado: number;
    idCliente: number;
    password: string;
    username: string;
    roles: string[];
    activo: boolean;
    empleado: Empleado;
    cliente: Cliente;
    carrito: Carrito;
}

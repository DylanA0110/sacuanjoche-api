import { Cliente } from '../../cliente/entities/cliente.entity';
import { Direccion } from '../../direccion/entities/direccion.entity';
export declare class ClienteDireccion {
    idClienteDireccion: number;
    idCliente: number;
    idDireccion: number;
    etiqueta: string;
    esPredeterminada: boolean;
    activo: boolean;
    cliente: Cliente;
    direccion: Direccion;
}

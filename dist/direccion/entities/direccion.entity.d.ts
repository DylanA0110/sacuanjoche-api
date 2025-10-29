import { ClienteDireccion } from '../../cliente-direccion/entities/cliente-direccion.entity';
import { Pedido } from '../../pedido/entities/pedido.entity';
export declare class Direccion {
    idDireccion: number;
    formattedAddress: string;
    country: string;
    stateProv: string;
    city: string;
    neighborhood: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    referencia: string;
    lat: number;
    lng: number;
    provider: string;
    placeId: string;
    accuracy: string;
    geolocation: string;
    activo: boolean;
    fechaCreacion: Date;
    fechaUltAct: Date;
    clienteDirecciones: ClienteDireccion[];
    pedidos: Pedido[];
}

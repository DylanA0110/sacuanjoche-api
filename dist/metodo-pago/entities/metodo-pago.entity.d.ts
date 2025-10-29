import { Pago } from '../../pago/entities/pago.entity';
export declare class MetodoPago {
    idMetodoPago: number;
    descripcion: string;
    activo: boolean;
    pagos: Pago[];
}

import { MetodoPagoService } from './metodo-pago.service';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { MetodoPago } from './entities/metodo-pago.entity';
export declare class MetodoPagoController {
    private readonly metodoPagoService;
    constructor(metodoPagoService: MetodoPagoService);
    create(createMetodoPagoDto: CreateMetodoPagoDto): Promise<MetodoPago>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: MetodoPago[];
        total: number;
    }>;
    findActiveMetodosPago(): Promise<MetodoPago[]>;
    findOne(id: number): Promise<MetodoPago>;
    update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto): Promise<MetodoPago>;
    remove(id: number): Promise<void>;
}

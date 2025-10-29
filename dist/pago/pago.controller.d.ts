import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Pago } from './entities/pago.entity';
export declare class PagoController {
    private readonly pagoService;
    constructor(pagoService: PagoService);
    create(createPagoDto: CreatePagoDto): Promise<Pago>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Pago[];
        total: number;
    }>;
    findByEstado(estado: string): Promise<Pago[]>;
    findByPedido(idPedido: number): Promise<Pago[]>;
    findOne(id: number): Promise<Pago>;
    update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago>;
    remove(id: number): Promise<void>;
}

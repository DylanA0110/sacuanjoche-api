import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class PagoService {
    private readonly pagoRepository;
    constructor(pagoRepository: Repository<Pago>);
    create(createPagoDto: CreatePagoDto): Promise<Pago>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Pago[];
        total: number;
    }>;
    findOne(id: number): Promise<Pago>;
    update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago>;
    remove(id: number): Promise<void>;
    findByEstado(estado: string): Promise<Pago[]>;
    findByPedido(idPedido: number): Promise<Pago[]>;
}

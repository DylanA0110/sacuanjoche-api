import { Repository } from 'typeorm';
import { MetodoPago } from './entities/metodo-pago.entity';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class MetodoPagoService {
    private readonly metodoPagoRepository;
    constructor(metodoPagoRepository: Repository<MetodoPago>);
    create(createMetodoPagoDto: CreateMetodoPagoDto): Promise<MetodoPago>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: MetodoPago[];
        total: number;
    }>;
    findOne(id: number): Promise<MetodoPago>;
    update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto): Promise<MetodoPago>;
    remove(id: number): Promise<void>;
    findActiveMetodosPago(): Promise<MetodoPago[]>;
}

import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class FacturaService {
    private readonly facturaRepository;
    constructor(facturaRepository: Repository<Factura>);
    create(createFacturaDto: CreateFacturaDto): Promise<Factura>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Factura[];
        total: number;
    }>;
    findOne(id: number): Promise<Factura>;
    update(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura>;
    remove(id: number): Promise<void>;
    findByEstado(estado: string): Promise<Factura[]>;
    findByEmpleado(idEmpleado: number): Promise<Factura[]>;
}

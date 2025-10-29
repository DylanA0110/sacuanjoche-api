import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Factura } from './entities/factura.entity';
export declare class FacturaController {
    private readonly facturaService;
    constructor(facturaService: FacturaService);
    create(createFacturaDto: CreateFacturaDto): Promise<Factura>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Factura[];
        total: number;
    }>;
    findByEstado(estado: string): Promise<Factura[]>;
    findByEmpleado(idEmpleado: number): Promise<Factura[]>;
    findOne(id: number): Promise<Factura>;
    update(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura>;
    remove(id: number): Promise<void>;
}

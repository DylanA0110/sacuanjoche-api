import { AccesorioService } from './accesorio.service';
import { CreateAccesorioDto } from './dto/create-accesorio.dto';
import { UpdateAccesorioDto } from './dto/update-accesorio.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Accesorio } from './entities/accesorio.entity';
export declare class AccesorioController {
    private readonly accesorioService;
    constructor(accesorioService: AccesorioService);
    create(createAccesorioDto: CreateAccesorioDto): Promise<Accesorio>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Accesorio[];
        total: number;
    }>;
    findActiveAccesorios(): Promise<Accesorio[]>;
    findByCategoria(categoria: string): Promise<Accesorio[]>;
    findOne(id: number): Promise<Accesorio>;
    update(id: number, updateAccesorioDto: UpdateAccesorioDto): Promise<Accesorio>;
    remove(id: number): Promise<void>;
}

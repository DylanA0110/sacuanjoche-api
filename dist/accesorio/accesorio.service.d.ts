import { Repository } from 'typeorm';
import { Accesorio } from './entities/accesorio.entity';
import { CreateAccesorioDto } from './dto/create-accesorio.dto';
import { UpdateAccesorioDto } from './dto/update-accesorio.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class AccesorioService {
    private readonly accesorioRepository;
    constructor(accesorioRepository: Repository<Accesorio>);
    create(createAccesorioDto: CreateAccesorioDto): Promise<Accesorio>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Accesorio[];
        total: number;
    }>;
    findOne(id: number): Promise<Accesorio>;
    update(id: number, updateAccesorioDto: UpdateAccesorioDto): Promise<Accesorio>;
    remove(id: number): Promise<void>;
    findByCategoria(categoria: string): Promise<Accesorio[]>;
    findActiveAccesorios(): Promise<Accesorio[]>;
}

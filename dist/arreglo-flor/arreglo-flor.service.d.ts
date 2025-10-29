import { Repository } from 'typeorm';
import { ArregloFlor } from './entities/arreglo-flor.entity';
import { CreateArregloFlorDto } from './dto/create-arreglo-flor.dto';
import { UpdateArregloFlorDto } from './dto/update-arreglo-flor.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class ArregloFlorService {
    private readonly arregloFlorRepository;
    constructor(arregloFlorRepository: Repository<ArregloFlor>);
    create(createArregloFlorDto: CreateArregloFlorDto): Promise<ArregloFlor>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: ArregloFlor[];
        total: number;
    }>;
    findOne(id: number): Promise<ArregloFlor>;
    update(id: number, updateArregloFlorDto: UpdateArregloFlorDto): Promise<ArregloFlor>;
    remove(id: number): Promise<void>;
    findByArreglo(idArreglo: number): Promise<ArregloFlor[]>;
    findByFlor(idFlor: number): Promise<ArregloFlor[]>;
}

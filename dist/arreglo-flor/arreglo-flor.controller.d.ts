import { ArregloFlorService } from './arreglo-flor.service';
import { CreateArregloFlorDto } from './dto/create-arreglo-flor.dto';
import { UpdateArregloFlorDto } from './dto/update-arreglo-flor.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ArregloFlor } from './entities/arreglo-flor.entity';
export declare class ArregloFlorController {
    private readonly arregloFlorService;
    constructor(arregloFlorService: ArregloFlorService);
    create(createArregloFlorDto: CreateArregloFlorDto): Promise<ArregloFlor>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: ArregloFlor[];
        total: number;
    }>;
    findByArreglo(idArreglo: number): Promise<ArregloFlor[]>;
    findByFlor(idFlor: number): Promise<ArregloFlor[]>;
    findOne(id: number): Promise<ArregloFlor>;
    update(id: number, updateArregloFlorDto: UpdateArregloFlorDto): Promise<ArregloFlor>;
    remove(id: number): Promise<void>;
}

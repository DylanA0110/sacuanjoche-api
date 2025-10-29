import { ArregloService } from './arreglo.service';
import { CreateArregloDto } from './dto/create-arreglo.dto';
import { UpdateArregloDto } from './dto/update-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Arreglo } from './entities/arreglo.entity';
export declare class ArregloController {
    private readonly arregloService;
    constructor(arregloService: ArregloService);
    create(createArregloDto: CreateArregloDto): Promise<Arreglo>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Arreglo[];
        total: number;
    }>;
    findActiveArreglos(): Promise<Arreglo[]>;
    findByFormaArreglo(idFormaArreglo: number): Promise<Arreglo[]>;
    findByPriceRange(minPrice: number, maxPrice: number): Promise<Arreglo[]>;
    findOne(id: number): Promise<Arreglo>;
    update(id: number, updateArregloDto: UpdateArregloDto): Promise<Arreglo>;
    remove(id: number): Promise<void>;
}

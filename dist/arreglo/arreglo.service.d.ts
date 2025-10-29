import { Repository } from 'typeorm';
import { Arreglo } from './entities/arreglo.entity';
import { CreateArregloDto } from './dto/create-arreglo.dto';
import { UpdateArregloDto } from './dto/update-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class ArregloService {
    private readonly arregloRepository;
    constructor(arregloRepository: Repository<Arreglo>);
    create(createArregloDto: CreateArregloDto): Promise<Arreglo>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Arreglo[];
        total: number;
    }>;
    findOne(id: number): Promise<Arreglo>;
    update(id: number, updateArregloDto: UpdateArregloDto): Promise<Arreglo>;
    remove(id: number): Promise<void>;
    findByFormaArreglo(idFormaArreglo: number): Promise<Arreglo[]>;
    findActiveArreglos(): Promise<Arreglo[]>;
    findByPriceRange(minPrice: number, maxPrice: number): Promise<Arreglo[]>;
}

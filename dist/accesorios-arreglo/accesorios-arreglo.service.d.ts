import { Repository } from 'typeorm';
import { AccesoriosArreglo } from './entities/accesorios-arreglo.entity';
import { CreateAccesoriosArregloDto } from './dto/create-accesorios-arreglo.dto';
import { UpdateAccesoriosArregloDto } from './dto/update-accesorios-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class AccesoriosArregloService {
    private readonly accesoriosArregloRepository;
    constructor(accesoriosArregloRepository: Repository<AccesoriosArreglo>);
    create(createAccesoriosArregloDto: CreateAccesoriosArregloDto): Promise<AccesoriosArreglo>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: AccesoriosArreglo[];
        total: number;
    }>;
    findOne(id: number): Promise<AccesoriosArreglo>;
    update(id: number, updateAccesoriosArregloDto: UpdateAccesoriosArregloDto): Promise<AccesoriosArreglo>;
    remove(id: number): Promise<void>;
    findByAccesorio(idAccesorio: number): Promise<AccesoriosArreglo[]>;
    findByArreglo(idArreglo: number): Promise<AccesoriosArreglo[]>;
}

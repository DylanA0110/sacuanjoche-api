import { AccesoriosArregloService } from './accesorios-arreglo.service';
import { CreateAccesoriosArregloDto } from './dto/create-accesorios-arreglo.dto';
import { UpdateAccesoriosArregloDto } from './dto/update-accesorios-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AccesoriosArreglo } from './entities/accesorios-arreglo.entity';
export declare class AccesoriosArregloController {
    private readonly accesoriosArregloService;
    constructor(accesoriosArregloService: AccesoriosArregloService);
    create(createAccesoriosArregloDto: CreateAccesoriosArregloDto): Promise<AccesoriosArreglo>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: AccesoriosArreglo[];
        total: number;
    }>;
    findByAccesorio(idAccesorio: number): Promise<AccesoriosArreglo[]>;
    findByArreglo(idArreglo: number): Promise<AccesoriosArreglo[]>;
    findOne(id: number): Promise<AccesoriosArreglo>;
    update(id: number, updateAccesoriosArregloDto: UpdateAccesoriosArregloDto): Promise<AccesoriosArreglo>;
    remove(id: number): Promise<void>;
}

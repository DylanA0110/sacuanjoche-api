import { CarritosArregloService } from './carritos-arreglo.service';
import { CreateCarritosArregloDto } from './dto/create-carritos-arreglo.dto';
import { UpdateCarritosArregloDto } from './dto/update-carritos-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CarritosArreglo } from './entities/carritos-arreglo.entity';
export declare class CarritosArregloController {
    private readonly carritosArregloService;
    constructor(carritosArregloService: CarritosArregloService);
    create(createCarritosArregloDto: CreateCarritosArregloDto): Promise<CarritosArreglo>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: CarritosArreglo[];
        total: number;
    }>;
    findByCarrito(idCarrito: number): Promise<CarritosArreglo[]>;
    findByArreglo(idArreglo: number): Promise<CarritosArreglo[]>;
    findOne(id: number): Promise<CarritosArreglo>;
    update(id: number, updateCarritosArregloDto: UpdateCarritosArregloDto): Promise<CarritosArreglo>;
    remove(id: number): Promise<void>;
}

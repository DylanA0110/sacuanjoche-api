import { Repository } from 'typeorm';
import { CarritosArreglo } from './entities/carritos-arreglo.entity';
import { CreateCarritosArregloDto } from './dto/create-carritos-arreglo.dto';
import { UpdateCarritosArregloDto } from './dto/update-carritos-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class CarritosArregloService {
    private readonly carritosArregloRepository;
    constructor(carritosArregloRepository: Repository<CarritosArreglo>);
    create(createCarritosArregloDto: CreateCarritosArregloDto): Promise<CarritosArreglo>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: CarritosArreglo[];
        total: number;
    }>;
    findOne(id: number): Promise<CarritosArreglo>;
    update(id: number, updateCarritosArregloDto: UpdateCarritosArregloDto): Promise<CarritosArreglo>;
    remove(id: number): Promise<void>;
    findByCarrito(idCarrito: number): Promise<CarritosArreglo[]>;
    findByArreglo(idArreglo: number): Promise<CarritosArreglo[]>;
}

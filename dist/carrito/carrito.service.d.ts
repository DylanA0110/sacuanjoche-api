import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class CarritoService {
    private readonly carritoRepository;
    constructor(carritoRepository: Repository<Carrito>);
    create(createCarritoDto: CreateCarritoDto): Promise<Carrito>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Carrito[];
        total: number;
    }>;
    findOne(id: number): Promise<Carrito>;
    update(id: number, updateCarritoDto: UpdateCarritoDto): Promise<Carrito>;
    remove(id: number): Promise<void>;
    findByUser(idUser: number): Promise<Carrito | null>;
    findActiveCarritos(): Promise<Carrito[]>;
}

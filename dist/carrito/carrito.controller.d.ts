import { CarritoService } from './carrito.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Carrito } from './entities/carrito.entity';
export declare class CarritoController {
    private readonly carritoService;
    constructor(carritoService: CarritoService);
    create(createCarritoDto: CreateCarritoDto): Promise<Carrito>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Carrito[];
        total: number;
    }>;
    findActiveCarritos(): Promise<Carrito[]>;
    findByUser(idUser: number): Promise<Carrito>;
    findOne(id: number): Promise<Carrito>;
    update(id: number, updateCarritoDto: UpdateCarritoDto): Promise<Carrito>;
    remove(id: number): Promise<void>;
}

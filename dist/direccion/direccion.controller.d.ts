import { DireccionService } from './direccion.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Direccion } from './entities/direccion.entity';
export declare class DireccionController {
    private readonly direccionService;
    constructor(direccionService: DireccionService);
    create(createDireccionDto: CreateDireccionDto): Promise<Direccion>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Direccion[];
        total: number;
    }>;
    findActiveDirecciones(): Promise<Direccion[]>;
    findByCity(city: string): Promise<Direccion[]>;
    findByPostalCode(postalCode: string): Promise<Direccion[]>;
    findOne(id: number): Promise<Direccion>;
    update(id: number, updateDireccionDto: UpdateDireccionDto): Promise<Direccion>;
    remove(id: number): Promise<void>;
}

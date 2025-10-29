import { Repository } from 'typeorm';
import { Direccion } from './entities/direccion.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class DireccionService {
    private readonly direccionRepository;
    constructor(direccionRepository: Repository<Direccion>);
    create(createDireccionDto: CreateDireccionDto): Promise<Direccion>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Direccion[];
        total: number;
    }>;
    findOne(id: number): Promise<Direccion>;
    update(id: number, updateDireccionDto: UpdateDireccionDto): Promise<Direccion>;
    remove(id: number): Promise<void>;
    findByCity(city: string): Promise<Direccion[]>;
    findByPostalCode(postalCode: string): Promise<Direccion[]>;
    findActiveDirecciones(): Promise<Direccion[]>;
}

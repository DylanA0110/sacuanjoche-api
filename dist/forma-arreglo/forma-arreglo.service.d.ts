import { Repository } from 'typeorm';
import { FormaArreglo } from './entities/forma-arreglo.entity';
import { CreateFormaArregloDto } from './dto/create-forma-arreglo.dto';
import { UpdateFormaArregloDto } from './dto/update-forma-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class FormaArregloService {
    private readonly formaArregloRepository;
    constructor(formaArregloRepository: Repository<FormaArreglo>);
    create(createFormaArregloDto: CreateFormaArregloDto): Promise<FormaArreglo>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: FormaArreglo[];
        total: number;
    }>;
    findOne(id: number): Promise<FormaArreglo>;
    update(id: number, updateFormaArregloDto: UpdateFormaArregloDto): Promise<FormaArreglo>;
    remove(id: number): Promise<void>;
}

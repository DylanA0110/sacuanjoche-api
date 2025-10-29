import { FormaArregloService } from './forma-arreglo.service';
import { CreateFormaArregloDto } from './dto/create-forma-arreglo.dto';
import { UpdateFormaArregloDto } from './dto/update-forma-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { FormaArreglo } from './entities/forma-arreglo.entity';
export declare class FormaArregloController {
    private readonly formaArregloService;
    constructor(formaArregloService: FormaArregloService);
    create(createFormaArregloDto: CreateFormaArregloDto): Promise<FormaArreglo>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: FormaArreglo[];
        total: number;
    }>;
    findOne(id: number): Promise<FormaArreglo>;
    update(id: number, updateFormaArregloDto: UpdateFormaArregloDto): Promise<FormaArreglo>;
    remove(id: number): Promise<void>;
}

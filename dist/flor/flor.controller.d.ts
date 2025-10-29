import { FlorService } from './flor.service';
import { CreateFlorDto } from './dto/create-flor.dto';
import { UpdateFlorDto } from './dto/update-flor.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Flor } from './entities/flor.entity';
export declare class FlorController {
    private readonly florService;
    constructor(florService: FlorService);
    create(createFlorDto: CreateFlorDto): Promise<Flor>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Flor[];
        total: number;
    }>;
    findActiveFlowers(): Promise<Flor[]>;
    findByTipo(tipo: string): Promise<Flor[]>;
    findByColor(color: string): Promise<Flor[]>;
    findOne(id: number): Promise<Flor>;
    update(id: number, updateFlorDto: UpdateFlorDto): Promise<Flor>;
    remove(id: number): Promise<void>;
}

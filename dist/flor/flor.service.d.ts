import { Repository } from 'typeorm';
import { Flor } from './entities/flor.entity';
import { CreateFlorDto } from './dto/create-flor.dto';
import { UpdateFlorDto } from './dto/update-flor.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class FlorService {
    private readonly florRepository;
    constructor(florRepository: Repository<Flor>);
    create(createFlorDto: CreateFlorDto): Promise<Flor>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Flor[];
        total: number;
    }>;
    findOne(id: number): Promise<Flor>;
    update(id: number, updateFlorDto: UpdateFlorDto): Promise<Flor>;
    remove(id: number): Promise<void>;
    findByTipo(tipo: string): Promise<Flor[]>;
    findByColor(color: string): Promise<Flor[]>;
    findActiveFlowers(): Promise<Flor[]>;
}

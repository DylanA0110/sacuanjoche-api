import { Repository } from 'typeorm';
import { Envio } from './entities/envio.entity';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class EnvioService {
    private readonly envioRepository;
    constructor(envioRepository: Repository<Envio>);
    create(createEnvioDto: CreateEnvioDto): Promise<Envio>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Envio[];
        total: number;
    }>;
    findOne(id: number): Promise<Envio>;
    update(id: number, updateEnvioDto: UpdateEnvioDto): Promise<Envio>;
    remove(id: number): Promise<void>;
    findByEstado(estadoEnvio: string): Promise<Envio[]>;
}

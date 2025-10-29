import { EnvioService } from './envio.service';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Envio } from './entities/envio.entity';
export declare class EnvioController {
    private readonly envioService;
    constructor(envioService: EnvioService);
    create(createEnvioDto: CreateEnvioDto): Promise<Envio>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Envio[];
        total: number;
    }>;
    findByEstado(estadoEnvio: string): Promise<Envio[]>;
    findOne(id: number): Promise<Envio>;
    update(id: number, updateEnvioDto: UpdateEnvioDto): Promise<Envio>;
    remove(id: number): Promise<void>;
}

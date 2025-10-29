import { Repository } from 'typeorm';
import { ClienteDireccion } from './entities/cliente-direccion.entity';
import { CreateClienteDireccionDto } from './dto/create-cliente-direccion.dto';
import { UpdateClienteDireccionDto } from './dto/update-cliente-direccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class ClienteDireccionService {
    private readonly clienteDireccionRepository;
    constructor(clienteDireccionRepository: Repository<ClienteDireccion>);
    create(createClienteDireccionDto: CreateClienteDireccionDto): Promise<ClienteDireccion>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: ClienteDireccion[];
        total: number;
    }>;
    findOne(id: number): Promise<ClienteDireccion>;
    update(id: number, updateClienteDireccionDto: UpdateClienteDireccionDto): Promise<ClienteDireccion>;
    remove(id: number): Promise<void>;
    findByCliente(idCliente: number): Promise<ClienteDireccion[]>;
    findPredeterminadaByCliente(idCliente: number): Promise<ClienteDireccion | null>;
}

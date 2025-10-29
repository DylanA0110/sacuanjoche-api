import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class ClienteService {
    private readonly clienteRepository;
    constructor(clienteRepository: Repository<Cliente>);
    create(createClienteDto: CreateClienteDto): Promise<Cliente>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Cliente[];
        total: number;
    }>;
    findOne(id: number): Promise<Cliente>;
    update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente>;
    remove(id: number): Promise<void>;
    findByTelefono(telefono: string): Promise<Cliente | null>;
    findActiveClients(): Promise<Cliente[]>;
}

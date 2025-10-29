import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Cliente } from './entities/cliente.entity';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    create(createClienteDto: CreateClienteDto): Promise<Cliente>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Cliente[];
        total: number;
    }>;
    findActiveClients(): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente>;
    remove(id: number): Promise<void>;
    findByTelefono(telefono: string): Promise<Cliente>;
}

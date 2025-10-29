import { ClienteDireccionService } from './cliente-direccion.service';
import { CreateClienteDireccionDto } from './dto/create-cliente-direccion.dto';
import { UpdateClienteDireccionDto } from './dto/update-cliente-direccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ClienteDireccion } from './entities/cliente-direccion.entity';
export declare class ClienteDireccionController {
    private readonly clienteDireccionService;
    constructor(clienteDireccionService: ClienteDireccionService);
    create(createClienteDireccionDto: CreateClienteDireccionDto): Promise<ClienteDireccion>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: ClienteDireccion[];
        total: number;
    }>;
    findByCliente(idCliente: number): Promise<ClienteDireccion[]>;
    findPredeterminadaByCliente(idCliente: number): Promise<ClienteDireccion>;
    findOne(id: number): Promise<ClienteDireccion>;
    update(id: number, updateClienteDireccionDto: UpdateClienteDireccionDto): Promise<ClienteDireccion>;
    remove(id: number): Promise<void>;
}

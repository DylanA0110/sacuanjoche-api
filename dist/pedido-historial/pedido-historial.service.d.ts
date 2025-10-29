import { Repository } from 'typeorm';
import { PedidoHistorial } from './entities/pedido-historial.entity';
import { CreatePedidoHistorialDto } from './dto/create-pedido-historial.dto';
import { UpdatePedidoHistorialDto } from './dto/update-pedido-historial.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class PedidoHistorialService {
    private readonly pedidoHistorialRepository;
    constructor(pedidoHistorialRepository: Repository<PedidoHistorial>);
    create(createPedidoHistorialDto: CreatePedidoHistorialDto): Promise<PedidoHistorial>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: PedidoHistorial[];
        total: number;
    }>;
    findOne(id: number): Promise<PedidoHistorial>;
    update(id: number, updatePedidoHistorialDto: UpdatePedidoHistorialDto): Promise<PedidoHistorial>;
    remove(id: number): Promise<void>;
    findByPedido(idPedido: number): Promise<PedidoHistorial[]>;
}

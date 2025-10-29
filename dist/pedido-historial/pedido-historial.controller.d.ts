import { PedidoHistorialService } from './pedido-historial.service';
import { CreatePedidoHistorialDto } from './dto/create-pedido-historial.dto';
import { UpdatePedidoHistorialDto } from './dto/update-pedido-historial.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { PedidoHistorial } from './entities/pedido-historial.entity';
export declare class PedidoHistorialController {
    private readonly pedidoHistorialService;
    constructor(pedidoHistorialService: PedidoHistorialService);
    create(createPedidoHistorialDto: CreatePedidoHistorialDto): Promise<PedidoHistorial>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: PedidoHistorial[];
        total: number;
    }>;
    findByPedido(idPedido: number): Promise<PedidoHistorial[]>;
    findOne(id: number): Promise<PedidoHistorial>;
    update(id: number, updatePedidoHistorialDto: UpdatePedidoHistorialDto): Promise<PedidoHistorial>;
    remove(id: number): Promise<void>;
}

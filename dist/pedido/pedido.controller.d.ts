import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Pedido } from './entities/pedido.entity';
export declare class PedidoController {
    private readonly pedidoService;
    constructor(pedidoService: PedidoService);
    create(createPedidoDto: CreatePedidoDto): Promise<Pedido>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Pedido[];
        total: number;
    }>;
    findByCliente(idCliente: number): Promise<Pedido[]>;
    findByEmpleado(idEmpleado: number): Promise<Pedido[]>;
    findByDateRange(fechaInicio: string, fechaFin: string): Promise<Pedido[]>;
    findOne(id: number): Promise<Pedido>;
    update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido>;
    remove(id: number): Promise<void>;
}

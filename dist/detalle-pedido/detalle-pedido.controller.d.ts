import { DetallePedidoService } from './detalle-pedido.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { DetallePedido } from './entities/detalle-pedido.entity';
export declare class DetallePedidoController {
    private readonly detallePedidoService;
    constructor(detallePedidoService: DetallePedidoService);
    create(createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: DetallePedido[];
        total: number;
    }>;
    findByPedido(idPedido: number): Promise<DetallePedido[]>;
    findOne(id: number): Promise<DetallePedido>;
    update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto): Promise<DetallePedido>;
    remove(id: number): Promise<void>;
}

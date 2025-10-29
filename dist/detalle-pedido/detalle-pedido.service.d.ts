import { Repository } from 'typeorm';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class DetallePedidoService {
    private readonly detallePedidoRepository;
    constructor(detallePedidoRepository: Repository<DetallePedido>);
    create(createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: DetallePedido[];
        total: number;
    }>;
    findOne(id: number): Promise<DetallePedido>;
    update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto): Promise<DetallePedido>;
    remove(id: number): Promise<void>;
    findByPedido(idPedido: number): Promise<DetallePedido[]>;
}

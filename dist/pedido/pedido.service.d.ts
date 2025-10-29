import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class PedidoService {
    private readonly pedidoRepository;
    constructor(pedidoRepository: Repository<Pedido>);
    create(createPedidoDto: CreatePedidoDto): Promise<Pedido>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Pedido[];
        total: number;
    }>;
    findOne(id: number): Promise<Pedido>;
    update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido>;
    remove(id: number): Promise<void>;
    findByCliente(idCliente: number): Promise<Pedido[]>;
    findByEmpleado(idEmpleado: number): Promise<Pedido[]>;
    findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Pedido[]>;
}

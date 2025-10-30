import { PartialType } from '@nestjs/swagger';
import { CreatePedidoHistorialDto } from './create-pedido-historial.dto';

export class UpdatePedidoHistorialDto extends PartialType(CreatePedidoHistorialDto) {}




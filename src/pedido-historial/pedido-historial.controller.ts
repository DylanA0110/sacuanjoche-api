import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PedidoHistorialService } from './pedido-historial.service';
import { CreatePedidoHistorialDto } from './dto/create-pedido-historial.dto';
import { UpdatePedidoHistorialDto } from './dto/update-pedido-historial.dto';
import { PedidoHistorial } from './entities/pedido-historial.entity';
import { FindPedidosHistorialDto } from './dto/find-pedidos-historial.dto';

@ApiTags('Pedido Historial')
@Controller('pedido-historial')
export class PedidoHistorialController {
  constructor(
    private readonly pedidoHistorialService: PedidoHistorialService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo historial de pedido' })
  @ApiResponse({
    status: 201,
    description: 'Historial creado exitosamente',
    type: PedidoHistorial,
  })
  create(@Body() createPedidoHistorialDto: CreatePedidoHistorialDto) {
    return this.pedidoHistorialService.create(createPedidoHistorialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los historiales con paginación' })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar en estado, nota, pedido o empleado asociado',
    example: 'Entregado',
  })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  findAll(@Query() filters: FindPedidosHistorialDto) {
    return this.pedidoHistorialService.findAll(filters);
  }

  @Get('pedido/:idPedido')
  @ApiOperation({ summary: 'Buscar historiales por pedido' })
  @ApiParam({ name: 'idPedido', description: 'ID del pedido', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Historiales encontrados',
    type: [PedidoHistorial],
  })
  findByPedido(@Param('idPedido', ParseIntPipe) idPedido: number) {
    return this.pedidoHistorialService.findByPedido(idPedido);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un historial por ID' })
  @ApiParam({ name: 'id', description: 'ID del historial', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Historial encontrado',
    type: PedidoHistorial,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoHistorialService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un historial' })
  @ApiParam({ name: 'id', description: 'ID del historial', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Actualizado exitosamente',
    type: PedidoHistorial,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePedidoHistorialDto: UpdatePedidoHistorialDto,
  ) {
    return this.pedidoHistorialService.update(id, updatePedidoHistorialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un historial' })
  @ApiParam({ name: 'id', description: 'ID del historial', example: 1 })
  @ApiResponse({ status: 200, description: 'Eliminado exitosamente' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidoHistorialService.remove(id);
  }
}

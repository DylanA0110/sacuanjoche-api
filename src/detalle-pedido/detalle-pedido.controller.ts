import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DetallePedidoService } from './detalle-pedido.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { DetallePedido } from './entities/detalle-pedido.entity';

@ApiTags('Detalle Pedidos')
@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo detalle de pedido' })
  @ApiResponse({ status: 201, description: 'Detalle pedido creado exitosamente', type: DetallePedido })
  create(@Body() createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    return this.detallePedidoService.create(createDetallePedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los detalles de pedido con paginación' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.detallePedidoService.findAll(paginationDto);
  }

  @Get('pedido/:idPedido')
  @ApiOperation({ summary: 'Buscar detalles por pedido' })
  @ApiParam({ name: 'idPedido', description: 'ID del pedido', example: 1 })
  @ApiResponse({ status: 200, description: 'Detalles encontrados', type: [DetallePedido] })
  findByPedido(@Param('idPedido', ParseIntPipe) idPedido: number) {
    return this.detallePedidoService.findByPedido(idPedido);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un detalle pedido por ID' })
  @ApiParam({ name: 'id', description: 'ID del detalle pedido', example: 1 })
  @ApiResponse({ status: 200, description: 'Detalle encontrado', type: DetallePedido })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetallePedido> {
    return this.detallePedidoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un detalle pedido' })
  @ApiParam({ name: 'id', description: 'ID del detalle pedido', example: 1 })
  @ApiResponse({ status: 200, description: 'Actualizado exitosamente', type: DetallePedido })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDetallePedidoDto: UpdateDetallePedidoDto): Promise<DetallePedido> {
    return this.detallePedidoService.update(id, updateDetallePedidoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un detalle pedido' })
  @ApiParam({ name: 'id', description: 'ID del detalle pedido', example: 1 })
  @ApiResponse({ status: 200, description: 'Eliminado exitosamente' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.detallePedidoService.remove(id);
  }
}


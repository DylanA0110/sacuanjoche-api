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
  @ApiResponse({
    status: 201,
    description: 'Detalle pedido creado exitosamente',
    type: DetallePedido,
  })
  create(@Body() createDetallePedidoDto: CreateDetallePedidoDto) {
    return this.detallePedidoService.create(createDetallePedidoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los detalles de pedido con paginación',
  })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.detallePedidoService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un detalle pedido por ID' })
  @ApiParam({ name: 'id', description: 'ID del detalle pedido', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Detalle encontrado',
    type: DetallePedido,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detallePedidoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un detalle pedido' })
  @ApiParam({ name: 'id', description: 'ID del detalle pedido', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Actualizado exitosamente',
    type: DetallePedido,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetallePedidoDto: UpdateDetallePedidoDto,
  ) {
    return this.detallePedidoService.update(id, updateDetallePedidoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un detalle pedido' })
  @ApiParam({ name: 'id', description: 'ID del detalle pedido', example: 1 })
  @ApiResponse({ status: 200, description: 'Eliminado exitosamente' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detallePedidoService.remove(id);
  }
}

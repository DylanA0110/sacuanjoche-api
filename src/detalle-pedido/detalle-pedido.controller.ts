import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { DetallePedidoService } from './detalle-pedido.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Detalle Pedidos')
@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo detalle de pedido' })
  @ApiResponse({ status: 201, description: 'Detalle de pedido creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createDetallePedidoDto: CreateDetallePedidoDto) {
    return this.detallePedidoService.create(createDetallePedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los detalles de pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de detalles de pedidos obtenida exitosamente' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de registros a obtener' })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de registros a omitir' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.detallePedidoService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un detalle de pedido por ID' })
  @ApiParam({ name: 'id', description: 'ID del detalle de pedido' })
  @ApiResponse({ status: 200, description: 'Detalle de pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Detalle de pedido no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detallePedidoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un detalle de pedido' })
  @ApiParam({ name: 'id', description: 'ID del detalle de pedido' })
  @ApiResponse({ status: 200, description: 'Detalle de pedido actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Detalle de pedido no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetallePedidoDto: UpdateDetallePedidoDto,
  ) {
    return this.detallePedidoService.update(id, updateDetallePedidoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un detalle de pedido' })
  @ApiParam({ name: 'id', description: 'ID del detalle de pedido' })
  @ApiResponse({ status: 200, description: 'Detalle de pedido eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Detalle de pedido no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detallePedidoService.remove(id);
  }
}

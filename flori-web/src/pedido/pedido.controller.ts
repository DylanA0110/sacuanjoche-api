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
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Pedido } from './entities/pedido.entity';

@ApiTags('Pedidos')
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({
    status: 201,
    description: 'Pedido creado exitosamente',
    type: Pedido,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pedidos con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a omitir', example: 0 })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Pedido' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pedidoService.findAll(paginationDto);
  }

  @Get('cliente/:idCliente')
  @ApiOperation({ summary: 'Buscar pedidos por cliente' })
  @ApiParam({ name: 'idCliente', description: 'ID del cliente', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pedidos encontrados por cliente',
    type: [Pedido],
  })
  findByCliente(@Param('idCliente', ParseIntPipe) idCliente: number) {
    return this.pedidoService.findByCliente(idCliente);
  }

  @Get('empleado/:idEmpleado')
  @ApiOperation({ summary: 'Buscar pedidos por empleado' })
  @ApiParam({ name: 'idEmpleado', description: 'ID del empleado', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pedidos encontrados por empleado',
    type: [Pedido],
  })
  findByEmpleado(@Param('idEmpleado', ParseIntPipe) idEmpleado: number) {
    return this.pedidoService.findByEmpleado(idEmpleado);
  }

  @Get('date-range')
  @ApiOperation({ summary: 'Buscar pedidos por rango de fechas' })
  @ApiQuery({ name: 'fechaInicio', description: 'Fecha de inicio', example: '2024-01-01' })
  @ApiQuery({ name: 'fechaFin', description: 'Fecha de fin', example: '2024-01-31' })
  @ApiResponse({
    status: 200,
    description: 'Pedidos encontrados en el rango de fechas',
    type: [Pedido],
  })
  findByDateRange(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.pedidoService.findByDateRange(new Date(fechaInicio), new Date(fechaFin));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiParam({ name: 'id', description: 'ID del pedido', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pedido encontrado exitosamente',
    type: Pedido,
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pedido' })
  @ApiParam({ name: 'id', description: 'ID del pedido', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pedido actualizado exitosamente',
    type: Pedido,
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    return this.pedidoService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pedido' })
  @ApiParam({ name: 'id', description: 'ID del pedido', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pedido eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.pedidoService.remove(id);
  }
}



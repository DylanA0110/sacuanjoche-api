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
} from '@nestjs/swagger';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Pago } from './entities/pago.entity';

@ApiTags('Pagos')
@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pago' })
  @ApiResponse({
    status: 201,
    description: 'Pago creado exitosamente',
    type: Pago,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createPagoDto: CreatePagoDto): Promise<Pago> {
    return this.pagoService.create(createPagoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pagos con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pagos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Pago' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pagoService.findAll(paginationDto);
  }

  @Get('estado/:estado')
  @ApiOperation({ summary: 'Buscar pagos por estado' })
  @ApiParam({ name: 'estado', description: 'Estado del pago', example: 'Completado' })
  @ApiResponse({
    status: 200,
    description: 'Pagos encontrados por estado',
    type: [Pago],
  })
  findByEstado(@Param('estado') estado: string) {
    return this.pagoService.findByEstado(estado);
  }

  @Get('pedido/:idPedido')
  @ApiOperation({ summary: 'Buscar pagos por pedido' })
  @ApiParam({ name: 'idPedido', description: 'ID del pedido', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pagos encontrados por pedido',
    type: [Pago],
  })
  findByPedido(@Param('idPedido', ParseIntPipe) idPedido: number) {
    return this.pagoService.findByPedido(idPedido);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiParam({ name: 'id', description: 'ID del pago', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pago encontrado exitosamente',
    type: Pago,
  })
  @ApiResponse({
    status: 404,
    description: 'Pago no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pago> {
    return this.pagoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pago' })
  @ApiParam({ name: 'id', description: 'ID del pago', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pago actualizado exitosamente',
    type: Pago,
  })
  @ApiResponse({
    status: 404,
    description: 'Pago no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePagoDto: UpdatePagoDto,
  ): Promise<Pago> {
    return this.pagoService.update(id, updatePagoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pago' })
  @ApiParam({ name: 'id', description: 'ID del pago', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pago eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Pago no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.pagoService.remove(id);
  }
}




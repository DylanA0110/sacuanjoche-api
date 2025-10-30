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
import { ClienteDireccionService } from './cliente-direccion.service';
import { CreateClienteDireccionDto } from './dto/create-cliente-direccion.dto';
import { UpdateClienteDireccionDto } from './dto/update-cliente-direccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ClienteDireccion } from './entities/cliente-direccion.entity';

@ApiTags('Cliente Direcciones')
@Controller('cliente-direccion')
export class ClienteDireccionController {
  constructor(private readonly clienteDireccionService: ClienteDireccionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cliente dirección' })
  @ApiResponse({
    status: 201,
    description: 'Cliente dirección creada exitosamente',
    type: ClienteDireccion,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createClienteDireccionDto: CreateClienteDireccionDto): Promise<ClienteDireccion> {
    return this.clienteDireccionService.create(createClienteDireccionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las cliente direcciones con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cliente direcciones obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/ClienteDireccion' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clienteDireccionService.findAll(paginationDto);
  }

  @Get('cliente/:idCliente')
  @ApiOperation({ summary: 'Buscar cliente direcciones por cliente' })
  @ApiParam({ name: 'idCliente', description: 'ID del cliente', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Cliente direcciones encontradas por cliente',
    type: [ClienteDireccion],
  })
  findByCliente(@Param('idCliente', ParseIntPipe) idCliente: number) {
    return this.clienteDireccionService.findByCliente(idCliente);
  }

  @Get('cliente/:idCliente/predeterminada')
  @ApiOperation({ summary: 'Buscar dirección predeterminada por cliente' })
  @ApiParam({ name: 'idCliente', description: 'ID del cliente', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Dirección predeterminada encontrada por cliente',
    type: ClienteDireccion,
  })
  @ApiResponse({
    status: 404,
    description: 'Dirección predeterminada no encontrada',
  })
  findPredeterminadaByCliente(@Param('idCliente', ParseIntPipe) idCliente: number) {
    return this.clienteDireccionService.findPredeterminadaByCliente(idCliente);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cliente dirección por ID' })
  @ApiParam({ name: 'id', description: 'ID de la cliente dirección', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Cliente dirección encontrada exitosamente',
    type: ClienteDireccion,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente dirección no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ClienteDireccion> {
    return this.clienteDireccionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una cliente dirección' })
  @ApiParam({ name: 'id', description: 'ID de la cliente dirección', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Cliente dirección actualizada exitosamente',
    type: ClienteDireccion,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente dirección no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDireccionDto: UpdateClienteDireccionDto,
  ): Promise<ClienteDireccion> {
    return this.clienteDireccionService.update(id, updateClienteDireccionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cliente dirección' })
  @ApiParam({ name: 'id', description: 'ID de la cliente dirección', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Cliente dirección eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente dirección no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clienteDireccionService.remove(id);
  }
}




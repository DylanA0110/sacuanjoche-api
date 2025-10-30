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
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Cliente } from './entities/cliente.entity';

@ApiTags('Clientes')
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente creado exitosamente',
    type: Cliente,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a omitir', example: 0 })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Cliente' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clienteService.findAll(paginationDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Obtener todos los clientes activos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes activos obtenida exitosamente',
    type: [Cliente],
  })
  findActiveClients() {
    return this.clienteService.findActiveClients();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado exitosamente',
    type: Cliente,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Cliente actualizado exitosamente',
    type: Cliente,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Cliente eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clienteService.remove(id);
  }

  @Get('telefono/:telefono')
  @ApiOperation({ summary: 'Buscar cliente por teléfono' })
  @ApiParam({ name: 'telefono', description: 'Número de teléfono del cliente', example: '+1234567890' })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado por teléfono',
    type: Cliente,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  findByTelefono(@Param('telefono') telefono: string) {
    return this.clienteService.findByTelefono(telefono);
  }
}


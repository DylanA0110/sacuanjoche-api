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
import { ClienteDireccionService } from './cliente-direccion.service';
import { CreateClienteDireccionDto } from './dto/create-cliente-direccion.dto';
import { UpdateClienteDireccionDto } from './dto/update-cliente-direccion.dto';
import { ClienteDireccion } from './entities/cliente-direccion.entity';
import { FindClienteDireccionesDto } from './dto/find-cliente-direcciones.dto';

@ApiTags('Cliente Direcciones')
@Controller('cliente-direccion')
export class ClienteDireccionController {
  constructor(
    private readonly clienteDireccionService: ClienteDireccionService,
  ) {}

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
  create(@Body() createClienteDireccionDto: CreateClienteDireccionDto) {
    return this.clienteDireccionService.create(createClienteDireccionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las cliente direcciones con paginación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de cliente direcciones obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/ClienteDireccion' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description:
      'Texto a buscar en la etiqueta, nombre del cliente o dirección formateada',
    example: 'Casa principal',
  })
  findAll(@Query() filters: FindClienteDireccionesDto) {
    return this.clienteDireccionService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cliente dirección por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la cliente dirección',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente dirección encontrada exitosamente',
    type: ClienteDireccion,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente dirección no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clienteDireccionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una cliente dirección' })
  @ApiParam({
    name: 'id',
    description: 'ID de la cliente dirección',
    example: 1,
  })
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
  ) {
    return this.clienteDireccionService.update(id, updateClienteDireccionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cliente dirección' })
  @ApiParam({
    name: 'id',
    description: 'ID de la cliente dirección',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente dirección eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente dirección no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clienteDireccionService.remove(id);
  }
}

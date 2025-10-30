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
import { CarritoService } from './carrito.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Carrito } from './entities/carrito.entity';

@ApiTags('Carritos')
@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo carrito' })
  @ApiResponse({
    status: 201,
    description: 'Carrito creado exitosamente',
    type: Carrito,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createCarritoDto: CreateCarritoDto): Promise<Carrito> {
    return this.carritoService.create(createCarritoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los carritos con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de carritos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Carrito' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.carritoService.findAll(paginationDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Obtener todos los carritos activos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de carritos activos obtenida exitosamente',
    type: [Carrito],
  })
  findActiveCarritos() {
    return this.carritoService.findActiveCarritos();
  }

  @Get('user/:idUser')
  @ApiOperation({ summary: 'Buscar carrito por usuario' })
  @ApiParam({ name: 'idUser', description: 'ID del usuario', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito encontrado por usuario',
    type: Carrito,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito no encontrado',
  })
  findByUser(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.carritoService.findByUser(idUser);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un carrito por ID' })
  @ApiParam({ name: 'id', description: 'ID del carrito', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito encontrado exitosamente',
    type: Carrito,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Carrito> {
    return this.carritoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un carrito' })
  @ApiParam({ name: 'id', description: 'ID del carrito', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito actualizado exitosamente',
    type: Carrito,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarritoDto: UpdateCarritoDto,
  ): Promise<Carrito> {
    return this.carritoService.update(id, updateCarritoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un carrito' })
  @ApiParam({ name: 'id', description: 'ID del carrito', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.carritoService.remove(id);
  }
}




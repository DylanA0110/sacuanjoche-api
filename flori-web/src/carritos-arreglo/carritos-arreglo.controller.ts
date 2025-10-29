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
import { CarritosArregloService } from './carritos-arreglo.service';
import { CreateCarritosArregloDto } from './dto/create-carritos-arreglo.dto';
import { UpdateCarritosArregloDto } from './dto/update-carritos-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CarritosArreglo } from './entities/carritos-arreglo.entity';

@ApiTags('Carritos Arreglos')
@Controller('carritos-arreglo')
export class CarritosArregloController {
  constructor(private readonly carritosArregloService: CarritosArregloService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo carrito arreglo' })
  @ApiResponse({
    status: 201,
    description: 'Carrito arreglo creado exitosamente',
    type: CarritosArreglo,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createCarritosArregloDto: CreateCarritosArregloDto): Promise<CarritosArreglo> {
    return this.carritosArregloService.create(createCarritosArregloDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los carritos arreglos con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de carritos arreglos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/CarritosArreglo' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.carritosArregloService.findAll(paginationDto);
  }

  @Get('carrito/:idCarrito')
  @ApiOperation({ summary: 'Buscar carritos arreglos por carrito' })
  @ApiParam({ name: 'idCarrito', description: 'ID del carrito', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carritos arreglos encontrados por carrito',
    type: [CarritosArreglo],
  })
  findByCarrito(@Param('idCarrito', ParseIntPipe) idCarrito: number) {
    return this.carritosArregloService.findByCarrito(idCarrito);
  }

  @Get('arreglo/:idArreglo')
  @ApiOperation({ summary: 'Buscar carritos arreglos por arreglo' })
  @ApiParam({ name: 'idArreglo', description: 'ID del arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carritos arreglos encontrados por arreglo',
    type: [CarritosArreglo],
  })
  findByArreglo(@Param('idArreglo', ParseIntPipe) idArreglo: number) {
    return this.carritosArregloService.findByArreglo(idArreglo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un carrito arreglo por ID' })
  @ApiParam({ name: 'id', description: 'ID del carrito arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito arreglo encontrado exitosamente',
    type: CarritosArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito arreglo no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CarritosArreglo> {
    return this.carritosArregloService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un carrito arreglo' })
  @ApiParam({ name: 'id', description: 'ID del carrito arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito arreglo actualizado exitosamente',
    type: CarritosArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito arreglo no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarritosArregloDto: UpdateCarritosArregloDto,
  ): Promise<CarritosArreglo> {
    return this.carritosArregloService.update(id, updateCarritosArregloDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un carrito arreglo' })
  @ApiParam({ name: 'id', description: 'ID del carrito arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito arreglo eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito arreglo no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.carritosArregloService.remove(id);
  }
}



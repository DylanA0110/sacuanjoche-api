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
import { ArregloService } from './arreglo.service';
import { CreateArregloDto } from './dto/create-arreglo.dto';
import { UpdateArregloDto } from './dto/update-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Arreglo } from './entities/arreglo.entity';

@ApiTags('Arreglos')
@Controller('arreglo')
export class ArregloController {
  constructor(private readonly arregloService: ArregloService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo arreglo floral' })
  @ApiResponse({
    status: 201,
    description: 'Arreglo creado exitosamente',
    type: Arreglo,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createArregloDto: CreateArregloDto): Promise<Arreglo> {
    return this.arregloService.create(createArregloDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los arreglos con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a omitir', example: 0 })
  @ApiResponse({
    status: 200,
    description: 'Lista de arreglos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Arreglo' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.arregloService.findAll(paginationDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Obtener todos los arreglos activos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de arreglos activos obtenida exitosamente',
    type: [Arreglo],
  })
  findActiveArreglos() {
    return this.arregloService.findActiveArreglos();
  }

  @Get('forma/:idFormaArreglo')
  @ApiOperation({ summary: 'Buscar arreglos por forma' })
  @ApiParam({ name: 'idFormaArreglo', description: 'ID de la forma de arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglos encontrados por forma',
    type: [Arreglo],
  })
  findByFormaArreglo(@Param('idFormaArreglo', ParseIntPipe) idFormaArreglo: number) {
    return this.arregloService.findByFormaArreglo(idFormaArreglo);
  }

  @Get('price-range')
  @ApiOperation({ summary: 'Buscar arreglos por rango de precio' })
  @ApiQuery({ name: 'minPrice', description: 'Precio mínimo', example: 10 })
  @ApiQuery({ name: 'maxPrice', description: 'Precio máximo', example: 50 })
  @ApiResponse({
    status: 200,
    description: 'Arreglos encontrados en el rango de precio',
    type: [Arreglo],
  })
  findByPriceRange(
    @Query('minPrice', ParseIntPipe) minPrice: number,
    @Query('maxPrice', ParseIntPipe) maxPrice: number,
  ) {
    return this.arregloService.findByPriceRange(minPrice, maxPrice);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un arreglo por ID' })
  @ApiParam({ name: 'id', description: 'ID del arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo encontrado exitosamente',
    type: Arreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Arreglo no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Arreglo> {
    return this.arregloService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un arreglo' })
  @ApiParam({ name: 'id', description: 'ID del arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo actualizado exitosamente',
    type: Arreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Arreglo no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArregloDto: UpdateArregloDto,
  ): Promise<Arreglo> {
    return this.arregloService.update(id, updateArregloDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un arreglo' })
  @ApiParam({ name: 'id', description: 'ID del arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Arreglo no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.arregloService.remove(id);
  }
}

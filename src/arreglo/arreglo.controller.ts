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
import { Arreglo } from './entities/arreglo.entity';
import { FindArreglosDto } from './dto/find-arreglos.dto';
import { FindArreglosPublicDto } from './dto/find-arreglos-public.dto';

@ApiTags('Arreglos')
@Controller('arreglos')
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
  create(@Body() createArregloDto: CreateArregloDto) {
    return this.arregloService.create(createArregloDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar arreglos (admin) con filtros' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de elementos por página',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Número de elementos a omitir',
    example: 0,
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar en el nombre, descripción o forma del arreglo',
    example: 'Bouquet',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de arreglos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Arreglo' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  findAll(@Query() filters: FindArreglosDto) {
    return this.arregloService.findAll(filters);
  }

  @Get('public')
  @ApiOperation({ summary: 'Catálogo público con filtros avanzados' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de elementos por página',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Número de elementos a omitir',
    example: 0,
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar',
    example: 'Bouquet',
  })
  @ApiQuery({
    name: 'idFormaArreglo',
    required: false,
    description: 'Filtrar por forma de arreglo',
    example: 1,
  })
  @ApiQuery({
    name: 'precioMin',
    required: false,
    description: 'Precio mínimo',
    example: 50.00,
  })
  @ApiQuery({
    name: 'precioMax',
    required: false,
    description: 'Precio máximo',
    example: 200.00,
  })
  @ApiQuery({
    name: 'flores',
    required: false,
    description: 'IDs de flores (separados por coma)',
    example: '1,2,3',
  })
  @ApiQuery({
    name: 'ordenarPor',
    required: false,
    description: 'Campo para ordenar',
    enum: ['nombre', 'precio', 'fechaCreacion'],
  })
  @ApiQuery({
    name: 'orden',
    required: false,
    description: 'Dirección del orden',
    enum: ['ASC', 'DESC'],
  })
  @ApiResponse({
    status: 200,
    description: 'Catálogo público obtenido exitosamente',
    type: [Arreglo],
  })
  findPublic(@Query() filters: any) {
    // Transformar flores de string a array si viene como string
    // Los query params pueden venir como string aunque el DTO espere number[]
    if (filters.flores) {
      if (typeof filters.flores === 'string') {
        filters.flores = filters.flores
          .split(',')
          .map((id: string) => parseInt(id, 10))
          .filter((id) => !isNaN(id) && id > 0);
      } else if (Array.isArray(filters.flores)) {
        // Asegurar que todos los valores sean números válidos
        filters.flores = filters.flores
          .map((id: any) => (typeof id === 'string' ? parseInt(id, 10) : id))
          .filter((id: any) => typeof id === 'number' && !isNaN(id) && id > 0);
      }
    }
    // Validar y convertir el objeto a FindArreglosPublicDto
    // Usar 'as' para indicar que ya transformamos los tipos
    return this.arregloService.findPublic(filters as FindArreglosPublicDto);
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
  findOne(@Param('id', ParseIntPipe) id: number) {
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
  ) {
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
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.arregloService.remove(id);
  }
}

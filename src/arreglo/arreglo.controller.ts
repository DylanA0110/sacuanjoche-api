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
  create(@Body() createArregloDto: CreateArregloDto) {
    return this.arregloService.create(createArregloDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los arreglos con paginación' })
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

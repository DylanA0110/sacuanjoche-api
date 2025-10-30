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
import { ArregloFlorService } from './arreglo-flor.service';
import { CreateArregloFlorDto } from './dto/create-arreglo-flor.dto';
import { UpdateArregloFlorDto } from './dto/update-arreglo-flor.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ArregloFlor } from './entities/arreglo-flor.entity';

@ApiTags('Arreglo Flores')
@Controller('arreglo-flor')
export class ArregloFlorController {
  constructor(private readonly arregloFlorService: ArregloFlorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva arreglo flor' })
  @ApiResponse({
    status: 201,
    description: 'Arreglo flor creada exitosamente',
    type: ArregloFlor,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createArregloFlorDto: CreateArregloFlorDto): Promise<ArregloFlor> {
    return this.arregloFlorService.create(createArregloFlorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las arreglo flores con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de arreglo flores obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/ArregloFlor' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.arregloFlorService.findAll(paginationDto);
  }

  @Get('arreglo/:idArreglo')
  @ApiOperation({ summary: 'Buscar arreglo flores por arreglo' })
  @ApiParam({ name: 'idArreglo', description: 'ID del arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo flores encontradas por arreglo',
    type: [ArregloFlor],
  })
  findByArreglo(@Param('idArreglo', ParseIntPipe) idArreglo: number) {
    return this.arregloFlorService.findByArreglo(idArreglo);
  }

  @Get('flor/:idFlor')
  @ApiOperation({ summary: 'Buscar arreglo flores por flor' })
  @ApiParam({ name: 'idFlor', description: 'ID de la flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo flores encontradas por flor',
    type: [ArregloFlor],
  })
  findByFlor(@Param('idFlor', ParseIntPipe) idFlor: number) {
    return this.arregloFlorService.findByFlor(idFlor);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una arreglo flor por ID' })
  @ApiParam({ name: 'id', description: 'ID de la arreglo flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo flor encontrada exitosamente',
    type: ArregloFlor,
  })
  @ApiResponse({
    status: 404,
    description: 'Arreglo flor no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ArregloFlor> {
    return this.arregloFlorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una arreglo flor' })
  @ApiParam({ name: 'id', description: 'ID de la arreglo flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo flor actualizada exitosamente',
    type: ArregloFlor,
  })
  @ApiResponse({
    status: 404,
    description: 'Arreglo flor no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArregloFlorDto: UpdateArregloFlorDto,
  ): Promise<ArregloFlor> {
    return this.arregloFlorService.update(id, updateArregloFlorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una arreglo flor' })
  @ApiParam({ name: 'id', description: 'ID de la arreglo flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo flor eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Arreglo flor no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.arregloFlorService.remove(id);
  }
}




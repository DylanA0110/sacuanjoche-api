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
import { FlorService } from './flor.service';
import { CreateFlorDto } from './dto/create-flor.dto';
import { UpdateFlorDto } from './dto/update-flor.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Flor } from './entities/flor.entity';

@ApiTags('Flores')
@Controller('flor')
export class FlorController {
  constructor(private readonly florService: FlorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva flor' })
  @ApiResponse({
    status: 201,
    description: 'Flor creada exitosamente',
    type: Flor,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createFlorDto: CreateFlorDto): Promise<Flor> {
    return this.florService.create(createFlorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las flores con paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de elementos a omitir', example: 0 })
  @ApiResponse({
    status: 200,
    description: 'Lista de flores obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Flor' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.florService.findAll(paginationDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Obtener todas las flores activas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de flores activas obtenida exitosamente',
    type: [Flor],
  })
  findActiveFlowers() {
    return this.florService.findActiveFlowers();
  }

  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Buscar flores por tipo' })
  @ApiParam({ name: 'tipo', description: 'Tipo de flor', example: 'Tropical' })
  @ApiResponse({
    status: 200,
    description: 'Flores encontradas por tipo',
    type: [Flor],
  })
  findByTipo(@Param('tipo') tipo: string) {
    return this.florService.findByTipo(tipo);
  }

  @Get('color/:color')
  @ApiOperation({ summary: 'Buscar flores por color' })
  @ApiParam({ name: 'color', description: 'Color de la flor', example: 'Rojo' })
  @ApiResponse({
    status: 200,
    description: 'Flores encontradas por color',
    type: [Flor],
  })
  findByColor(@Param('color') color: string) {
    return this.florService.findByColor(color);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una flor por ID' })
  @ApiParam({ name: 'id', description: 'ID de la flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Flor encontrada exitosamente',
    type: Flor,
  })
  @ApiResponse({
    status: 404,
    description: 'Flor no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Flor> {
    return this.florService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una flor' })
  @ApiParam({ name: 'id', description: 'ID de la flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Flor actualizada exitosamente',
    type: Flor,
  })
  @ApiResponse({
    status: 404,
    description: 'Flor no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFlorDto: UpdateFlorDto,
  ): Promise<Flor> {
    return this.florService.update(id, updateFlorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una flor' })
  @ApiParam({ name: 'id', description: 'ID de la flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Flor eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Flor no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.florService.remove(id);
  }
}




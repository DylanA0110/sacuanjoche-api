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
import { FormaArregloService } from './forma-arreglo.service';
import { CreateFormaArregloDto } from './dto/create-forma-arreglo.dto';
import { UpdateFormaArregloDto } from './dto/update-forma-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { FormaArreglo } from './entities/forma-arreglo.entity';

@ApiTags('Formas de Arreglo')
@Controller('forma-arreglo')
export class FormaArregloController {
  constructor(private readonly formaArregloService: FormaArregloService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva forma de arreglo' })
  @ApiResponse({
    status: 201,
    description: 'Forma de arreglo creada exitosamente',
    type: FormaArreglo,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createFormaArregloDto: CreateFormaArregloDto): Promise<FormaArreglo> {
    return this.formaArregloService.create(createFormaArregloDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las formas de arreglo con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de formas de arreglo obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/FormaArreglo' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.formaArregloService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una forma de arreglo por ID' })
  @ApiParam({ name: 'id', description: 'ID de la forma de arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Forma de arreglo encontrada exitosamente',
    type: FormaArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Forma de arreglo no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FormaArreglo> {
    return this.formaArregloService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una forma de arreglo' })
  @ApiParam({ name: 'id', description: 'ID de la forma de arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Forma de arreglo actualizada exitosamente',
    type: FormaArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Forma de arreglo no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFormaArregloDto: UpdateFormaArregloDto,
  ): Promise<FormaArreglo> {
    return this.formaArregloService.update(id, updateFormaArregloDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una forma de arreglo' })
  @ApiParam({ name: 'id', description: 'ID de la forma de arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Forma de arreglo eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Forma de arreglo no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.formaArregloService.remove(id);
  }
}




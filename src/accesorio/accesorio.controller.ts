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
import { AccesorioService } from './accesorio.service';
import { CreateAccesorioDto } from './dto/create-accesorio.dto';
import { UpdateAccesorioDto } from './dto/update-accesorio.dto';
import { Accesorio } from './entities/accesorio.entity';
import { FindAccesoriosDto } from './dto/find-accesorios.dto';

@ApiTags('Accesorios')
@Controller('accesorio')
export class AccesorioController {
  constructor(private readonly accesorioService: AccesorioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo accesorio' })
  @ApiResponse({
    status: 201,
    description: 'Accesorio creado exitosamente',
    type: Accesorio,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createAccesorioDto: CreateAccesorioDto) {
    return this.accesorioService.create(createAccesorioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los accesorios con paginación' })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar en la descripción o categoría del accesorio',
    example: 'Cinta decorativa',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de accesorios obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Accesorio' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  findAll(@Query() filters: FindAccesoriosDto) {
    return this.accesorioService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un accesorio por ID' })
  @ApiParam({ name: 'id', description: 'ID del accesorio', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Accesorio encontrado exitosamente',
    type: Accesorio,
  })
  @ApiResponse({
    status: 404,
    description: 'Accesorio no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accesorioService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un accesorio' })
  @ApiParam({ name: 'id', description: 'ID del accesorio', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Accesorio actualizado exitosamente',
    type: Accesorio,
  })
  @ApiResponse({
    status: 404,
    description: 'Accesorio no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccesorioDto: UpdateAccesorioDto,
  ) {
    return this.accesorioService.update(id, updateAccesorioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un accesorio' })
  @ApiParam({ name: 'id', description: 'ID del accesorio', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Accesorio eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Accesorio no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accesorioService.remove(id);
  }
}

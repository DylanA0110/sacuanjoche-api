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
import { AccesoriosArregloService } from './accesorios-arreglo.service';
import { CreateAccesoriosArregloDto } from './dto/create-accesorios-arreglo.dto';
import { UpdateAccesoriosArregloDto } from './dto/update-accesorios-arreglo.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AccesoriosArreglo } from './entities/accesorios-arreglo.entity';

@ApiTags('Accesorios Arreglos')
@Controller('accesorios-arreglo')
export class AccesoriosArregloController {
  constructor(private readonly accesoriosArregloService: AccesoriosArregloService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva accesorios arreglo' })
  @ApiResponse({
    status: 201,
    description: 'Accesorios arreglo creada exitosamente',
    type: AccesoriosArreglo,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createAccesoriosArregloDto: CreateAccesoriosArregloDto): Promise<AccesoriosArreglo> {
    return this.accesoriosArregloService.create(createAccesoriosArregloDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las accesorios arreglos con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de accesorios arreglos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/AccesoriosArreglo' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.accesoriosArregloService.findAll(paginationDto);
  }

  @Get('accesorio/:idAccesorio')
  @ApiOperation({ summary: 'Buscar accesorios arreglos por accesorio' })
  @ApiParam({ name: 'idAccesorio', description: 'ID del accesorio', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Accesorios arreglos encontrados por accesorio',
    type: [AccesoriosArreglo],
  })
  findByAccesorio(@Param('idAccesorio', ParseIntPipe) idAccesorio: number) {
    return this.accesoriosArregloService.findByAccesorio(idAccesorio);
  }

  @Get('arreglo/:idArreglo')
  @ApiOperation({ summary: 'Buscar accesorios arreglos por arreglo' })
  @ApiParam({ name: 'idArreglo', description: 'ID del arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Accesorios arreglos encontrados por arreglo',
    type: [AccesoriosArreglo],
  })
  findByArreglo(@Param('idArreglo', ParseIntPipe) idArreglo: number) {
    return this.accesoriosArregloService.findByArreglo(idArreglo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una accesorios arreglo por ID' })
  @ApiParam({ name: 'id', description: 'ID de la accesorios arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Accesorios arreglo encontrada exitosamente',
    type: AccesoriosArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Accesorios arreglo no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<AccesoriosArreglo> {
    return this.accesoriosArregloService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una accesorios arreglo' })
  @ApiParam({ name: 'id', description: 'ID de la accesorios arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Accesorios arreglo actualizada exitosamente',
    type: AccesoriosArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Accesorios arreglo no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccesoriosArregloDto: UpdateAccesoriosArregloDto,
  ): Promise<AccesoriosArreglo> {
    return this.accesoriosArregloService.update(id, updateAccesoriosArregloDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una accesorios arreglo' })
  @ApiParam({ name: 'id', description: 'ID de la accesorios arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Accesorios arreglo eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Accesorios arreglo no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.accesoriosArregloService.remove(id);
  }
}




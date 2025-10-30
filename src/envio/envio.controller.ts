import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EnvioService } from './envio.service';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Envio } from './entities/envio.entity';

@ApiTags('Envíos')
@Controller('envio')
export class EnvioController {
  constructor(private readonly envioService: EnvioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo envío' })
  @ApiResponse({ status: 201, description: 'Envío creado exitosamente', type: Envio })
  create(@Body() createEnvioDto: CreateEnvioDto): Promise<Envio> {
    return this.envioService.create(createEnvioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los envíos con paginación' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.envioService.findAll(paginationDto);
  }

  @Get('estado/:estadoEnvio')
  @ApiOperation({ summary: 'Buscar envíos por estado' })
  @ApiParam({ name: 'estadoEnvio', description: 'Estado del envío', example: 'Programado' })
  @ApiResponse({ status: 200, description: 'Envíos encontrados', type: [Envio] })
  findByEstado(@Param('estadoEnvio') estadoEnvio: string) {
    return this.envioService.findByEstado(estadoEnvio);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un envío por ID' })
  @ApiParam({ name: 'id', description: 'ID del envío', example: 1 })
  @ApiResponse({ status: 200, description: 'Envío encontrado', type: Envio })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Envio> {
    return this.envioService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un envío' })
  @ApiParam({ name: 'id', description: 'ID del envío', example: 1 })
  @ApiResponse({ status: 200, description: 'Actualizado exitosamente', type: Envio })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEnvioDto: UpdateEnvioDto): Promise<Envio> {
    return this.envioService.update(id, updateEnvioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un envío' })
  @ApiParam({ name: 'id', description: 'ID del envío', example: 1 })
  @ApiResponse({ status: 200, description: 'Eliminado exitosamente' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.envioService.remove(id);
  }
}




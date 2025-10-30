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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DireccionService } from './direccion.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Direccion } from './entities/direccion.entity';

@ApiTags('Direcciones')
@Controller('direccion')
export class DireccionController {
  constructor(private readonly direccionService: DireccionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva dirección' })
  @ApiResponse({
    status: 201,
    description: 'Dirección creada exitosamente',
    type: Direccion,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createDireccionDto: CreateDireccionDto) {
    return this.direccionService.create(createDireccionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las direcciones con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de direcciones obtenida exitosamente',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.direccionService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una dirección por ID' })
  @ApiParam({ name: 'id', description: 'ID de la dirección', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Dirección encontrada exitosamente',
    type: Direccion,
  })
  @ApiResponse({
    status: 404,
    description: 'Dirección no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.direccionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una dirección' })
  @ApiParam({ name: 'id', description: 'ID de la dirección', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Dirección actualizada exitosamente',
    type: Direccion,
  })
  @ApiResponse({
    status: 404,
    description: 'Dirección no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDireccionDto: UpdateDireccionDto,
  ) {
    return this.direccionService.update(id, updateDireccionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una dirección' })
  @ApiParam({ name: 'id', description: 'ID de la dirección', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Dirección eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Dirección no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.direccionService.remove(id);
  }
}

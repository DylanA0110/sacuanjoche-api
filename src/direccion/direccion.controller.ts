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
  create(@Body() createDireccionDto: CreateDireccionDto): Promise<Direccion> {
    return this.direccionService.create(createDireccionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las direcciones con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de direcciones obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Direccion' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.direccionService.findAll(paginationDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Obtener todas las direcciones activas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de direcciones activas obtenida exitosamente',
    type: [Direccion],
  })
  findActiveDirecciones() {
    return this.direccionService.findActiveDirecciones();
  }

  @Get('city/:city')
  @ApiOperation({ summary: 'Buscar direcciones por ciudad' })
  @ApiParam({ name: 'city', description: 'Nombre de la ciudad', example: 'New York' })
  @ApiResponse({
    status: 200,
    description: 'Direcciones encontradas por ciudad',
    type: [Direccion],
  })
  findByCity(@Param('city') city: string) {
    return this.direccionService.findByCity(city);
  }

  @Get('postal-code/:postalCode')
  @ApiOperation({ summary: 'Buscar direcciones por código postal' })
  @ApiParam({ name: 'postalCode', description: 'Código postal', example: '10001' })
  @ApiResponse({
    status: 200,
    description: 'Direcciones encontradas por código postal',
    type: [Direccion],
  })
  findByPostalCode(@Param('postalCode') postalCode: string) {
    return this.direccionService.findByPostalCode(postalCode);
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
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Direccion> {
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
  ): Promise<Direccion> {
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
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.direccionService.remove(id);
  }
}




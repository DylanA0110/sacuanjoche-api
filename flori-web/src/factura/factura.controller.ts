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
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Factura } from './entities/factura.entity';

@ApiTags('Facturas')
@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva factura' })
  @ApiResponse({
    status: 201,
    description: 'Factura creada exitosamente',
    type: Factura,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createFacturaDto: CreateFacturaDto): Promise<Factura> {
    return this.facturaService.create(createFacturaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las facturas con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de facturas obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Factura' }
        },
        total: { type: 'number', description: 'Total de registros' }
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.facturaService.findAll(paginationDto);
  }

  @Get('estado/:estado')
  @ApiOperation({ summary: 'Buscar facturas por estado' })
  @ApiParam({ name: 'estado', description: 'Estado de la factura', example: 'Emitida' })
  @ApiResponse({
    status: 200,
    description: 'Facturas encontradas por estado',
    type: [Factura],
  })
  findByEstado(@Param('estado') estado: string) {
    return this.facturaService.findByEstado(estado);
  }

  @Get('empleado/:idEmpleado')
  @ApiOperation({ summary: 'Buscar facturas por empleado' })
  @ApiParam({ name: 'idEmpleado', description: 'ID del empleado', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Facturas encontradas por empleado',
    type: [Factura],
  })
  findByEmpleado(@Param('idEmpleado', ParseIntPipe) idEmpleado: number) {
    return this.facturaService.findByEmpleado(idEmpleado);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura por ID' })
  @ApiParam({ name: 'id', description: 'ID de la factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Factura encontrada exitosamente',
    type: Factura,
  })
  @ApiResponse({
    status: 404,
    description: 'Factura no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Factura> {
    return this.facturaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Factura actualizada exitosamente',
    type: Factura,
  })
  @ApiResponse({
    status: 404,
    description: 'Factura no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacturaDto: UpdateFacturaDto,
  ): Promise<Factura> {
    return this.facturaService.update(id, updateFacturaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Factura eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Factura no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.facturaService.remove(id);
  }
}



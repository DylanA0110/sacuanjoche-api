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
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Factura } from './entities/factura.entity';
import { FindFacturasDto } from './dto/find-facturas.dto';

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
  create(@Body() createFacturaDto: CreateFacturaDto) {
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
          items: { $ref: '#/components/schemas/Factura' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description:
      'Texto a buscar en número, estado, pedido o nombre del empleado',
    example: 'FAC-2025-001',
  })
  findAll(@Query() filters: FindFacturasDto) {
    return this.facturaService.findAll(filters);
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
  findOne(@Param('id', ParseIntPipe) id: number) {
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
  ) {
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
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facturaService.remove(id);
  }
}

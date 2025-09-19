import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Facturas')
@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva factura' })
  @ApiResponse({ status: 201, description: 'Factura creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturaService.create(createFacturaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las facturas' })
  @ApiResponse({ status: 200, description: 'Lista de facturas obtenida exitosamente' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de registros a obtener' })
  @ApiQuery({ name: 'offset', required: false, description: 'Número de registros a omitir' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.facturaService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura por ID' })
  @ApiParam({ name: 'id', description: 'ID de la factura' })
  @ApiResponse({ status: 200, description: 'Factura encontrada' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.facturaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura' })
  @ApiResponse({ status: 200, description: 'Factura actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacturaDto: UpdateFacturaDto,
  ) {
    return this.facturaService.update(id, updateFacturaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una factura' })
  @ApiParam({ name: 'id', description: 'ID de la factura' })
  @ApiResponse({ status: 200, description: 'Factura eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facturaService.remove(id);
  }
}

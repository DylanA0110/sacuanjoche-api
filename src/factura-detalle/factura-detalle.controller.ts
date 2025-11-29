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
import { FacturaDetalleService } from './factura-detalle.service';
import { CreateFacturaDetalleDto } from './dto/create-factura-detalle.dto';
import { UpdateFacturaDetalleDto } from './dto/update-factura-detalle.dto';
import { FacturaDetalle } from './entities/factura-detalle.entity';
import { FindFacturasDetalleDto } from './dto/find-facturas-detalle.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Factura Detalle')
@Controller('factura-detalle')
export class FacturaDetalleController {
  constructor(
    private readonly facturaDetalleService: FacturaDetalleService,
  ) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Crear un nuevo detalle de factura' })
  @ApiResponse({
    status: 201,
    description: 'Detalle de factura creado exitosamente',
    type: FacturaDetalle,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createFacturaDetalleDto: CreateFacturaDetalleDto) {
    return this.facturaDetalleService.create(createFacturaDetalleDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Obtener todos los detalles de factura con paginación' })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar en cantidad, precio, subtotal, factura o arreglo',
    example: '25.99',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de detalles de factura obtenida exitosamente',
    type: [FacturaDetalle],
  })
  findAll(@Query() filters: FindFacturasDetalleDto) {
    return this.facturaDetalleService.findAll(filters);
  }

  @Get('factura/:idFactura')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Buscar detalles por factura' })
  @ApiParam({ name: 'idFactura', description: 'ID de la factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Detalles encontrados',
    type: [FacturaDetalle],
  })
  findByFactura(@Param('idFactura', ParseIntPipe) idFactura: number) {
    return this.facturaDetalleService.findByFactura(idFactura);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Obtener un detalle de factura por ID' })
  @ApiParam({ name: 'id', description: 'ID del detalle de factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Detalle de factura encontrado exitosamente',
    type: FacturaDetalle,
  })
  @ApiResponse({
    status: 404,
    description: 'Detalle de factura no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.facturaDetalleService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Actualizar un detalle de factura' })
  @ApiParam({ name: 'id', description: 'ID del detalle de factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Detalle de factura actualizado exitosamente',
    type: FacturaDetalle,
  })
  @ApiResponse({
    status: 404,
    description: 'Detalle de factura no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacturaDetalleDto: UpdateFacturaDetalleDto,
  ) {
    return this.facturaDetalleService.update(id, updateFacturaDetalleDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Eliminar un detalle de factura' })
  @ApiParam({ name: 'id', description: 'ID del detalle de factura', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Detalle de factura eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Detalle de factura no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facturaDetalleService.remove(id);
  }
}


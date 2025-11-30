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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CarritoService } from './carrito.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { Carrito } from './entities/carrito.entity';
import { FindCarritosDto } from './dto/find-carritos.dto';
import { CrearPedidoDesdeCarritoDto } from './dto/crear-pedido-desde-carrito.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@ApiTags('Carritos')
@ApiBearerAuth('JWT-auth')
@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.cliente)
  @ApiOperation({ summary: 'Crear un nuevo carrito' })
  @ApiResponse({
    status: 201,
    description: 'Carrito creado exitosamente',
    type: Carrito,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createCarritoDto: CreateCarritoDto) {
    return this.carritoService.create(createCarritoDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.cliente)
  @ApiOperation({ summary: 'Obtener todos los carritos con paginación' })
  @ApiQuery({
    name: 'q',
    description: 'Texto a buscar en el correo del usuario asociado',
    example: 'cliente@example.com',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de carritos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Carrito' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  findAll(@Query() filters: FindCarritosDto) {
    return this.carritoService.findAll(filters);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.cliente)
  @ApiOperation({ summary: 'Obtener un carrito por ID' })
  @ApiParam({ name: 'id', description: 'ID del carrito', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito encontrado exitosamente',
    type: Carrito,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carritoService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.cliente)
  @ApiOperation({ summary: 'Actualizar un carrito' })
  @ApiParam({ name: 'id', description: 'ID del carrito', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito actualizado exitosamente',
    type: Carrito,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarritoDto: UpdateCarritoDto,
  ) {
    return this.carritoService.update(id, updateCarritoDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.cliente)
  @ApiOperation({ summary: 'Eliminar un carrito' })
  @ApiParam({ name: 'id', description: 'ID del carrito', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carritoService.remove(id);
  }

  @Post(':idCarrito/asociar-pago/:idPago')
  @Auth(ValidRoles.admin, ValidRoles.cliente)
  @ApiOperation({
    summary: 'Asociar un pago completado a un carrito',
    description:
      'Asocia un pago que esté en estado PAGADO a un carrito. El pago debe estar completado antes de asociarlo.',
  })
  @ApiParam({ name: 'idCarrito', description: 'ID del carrito', example: 1 })
  @ApiParam({ name: 'idPago', description: 'ID del pago', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pago asociado al carrito exitosamente',
    type: Carrito,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito o pago no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'El pago no está completado o ya está asociado a otro carrito',
  })
  asociarPago(
    @Param('idCarrito', ParseIntPipe) idCarrito: number,
    @Param('idPago', ParseIntPipe) idPago: number,
  ) {
    return this.carritoService.asociarPago(idCarrito, idPago);
  }

  @Post(':idCarrito/crear-pedido')
  @Auth(ValidRoles.admin, ValidRoles.cliente)
  @ApiOperation({
    summary: 'Crear un pedido desde un carrito',
    description:
      'Crea un pedido a partir de los productos en el carrito. El carrito debe tener un pago asociado y completado. Los productos del carrito se copiarán al detalle del pedido.',
  })
  @ApiParam({ name: 'idCarrito', description: 'ID del carrito', example: 1 })
  @ApiResponse({
    status: 201,
    description: 'Pedido creado exitosamente desde el carrito',
    type: Pedido,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito o entidades relacionadas no encontradas',
  })
  @ApiResponse({
    status: 400,
    description:
      'El carrito no tiene productos, no tiene pago asociado, o el pago no está completado',
  })
  crearPedidoDesdeCarrito(
    @Param('idCarrito', ParseIntPipe) idCarrito: number,
    @Body() crearPedidoDto: CrearPedidoDesdeCarritoDto,
  ) {
    return this.carritoService.crearPedidoDesdeCarrito(
      idCarrito,
      crearPedidoDto,
    );
  }
}

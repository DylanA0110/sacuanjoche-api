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
import { MetodoPagoService } from './metodo-pago.service';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';
import { MetodoPago } from './entities/metodo-pago.entity';
import { FindMetodosPagoDto } from './dto/find-metodos-pago.dto';

@ApiTags('Métodos de Pago')
@Controller('metodo-pago')
export class MetodoPagoController {
  constructor(private readonly metodoPagoService: MetodoPagoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo método de pago' })
  @ApiResponse({
    status: 201,
    description: 'Método de pago creado exitosamente',
    type: MetodoPago,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createMetodoPagoDto: CreateMetodoPagoDto) {
    return this.metodoPagoService.create(createMetodoPagoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los métodos de pago con paginación' })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar en la descripción del método de pago',
    example: 'Tarjeta de crédito',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de métodos de pago obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/MetodoPago' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  findAll(@Query() filters: FindMetodosPagoDto) {
    return this.metodoPagoService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un método de pago por ID' })
  @ApiParam({ name: 'id', description: 'ID del método de pago', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Método de pago encontrado exitosamente',
    type: MetodoPago,
  })
  @ApiResponse({
    status: 404,
    description: 'Método de pago no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metodoPagoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un método de pago' })
  @ApiParam({ name: 'id', description: 'ID del método de pago', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Método de pago actualizado exitosamente',
    type: MetodoPago,
  })
  @ApiResponse({
    status: 404,
    description: 'Método de pago no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMetodoPagoDto: UpdateMetodoPagoDto,
  ) {
    return this.metodoPagoService.update(id, updateMetodoPagoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un método de pago' })
  @ApiParam({ name: 'id', description: 'ID del método de pago', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Método de pago eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Método de pago no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.metodoPagoService.remove(id);
  }
}

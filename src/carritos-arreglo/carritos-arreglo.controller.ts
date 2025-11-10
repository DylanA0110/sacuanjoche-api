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
import { CarritosArregloService } from './carritos-arreglo.service';
import { CreateCarritosArregloDto } from './dto/create-carritos-arreglo.dto';
import { UpdateCarritosArregloDto } from './dto/update-carritos-arreglo.dto';
import { CarritosArreglo } from './entities/carritos-arreglo.entity';
import { FindCarritosArregloDto } from './dto/find-carritos-arreglo.dto';

@ApiTags('Carritos Arreglos')
@Controller('carritos-arreglo')
export class CarritosArregloController {
  constructor(
    private readonly carritosArregloService: CarritosArregloService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo carrito arreglo' })
  @ApiResponse({
    status: 201,
    description: 'Carrito arreglo creado exitosamente',
    type: CarritosArreglo,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createCarritosArregloDto: CreateCarritosArregloDto) {
    return this.carritosArregloService.create(createCarritosArregloDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los carritos arreglos con paginación',
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description:
      'Texto a buscar en el nombre del arreglo o en el correo del usuario',
    example: 'Ramo de rosas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de carritos arreglos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/CarritosArreglo' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  findAll(@Query() filters: FindCarritosArregloDto) {
    return this.carritosArregloService.findAll(filters);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un carrito arreglo' })
  @ApiParam({ name: 'id', description: 'ID del carrito arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito arreglo actualizado exitosamente',
    type: CarritosArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito arreglo no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarritosArregloDto: UpdateCarritosArregloDto,
  ) {
    return this.carritosArregloService.update(id, updateCarritosArregloDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un carrito arreglo' })
  @ApiParam({ name: 'id', description: 'ID del carrito arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Carrito arreglo eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Carrito arreglo no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carritosArregloService.remove(id);
  }
}

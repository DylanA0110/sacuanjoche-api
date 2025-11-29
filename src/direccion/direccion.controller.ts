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
import { DireccionService } from './direccion.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { Direccion } from './entities/direccion.entity';
import { FindDireccionesDto } from './dto/find-direcciones.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Direcciones')
@Controller('direccion')
export class DireccionController {
  constructor(private readonly direccionService: DireccionService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
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
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.conductor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Obtener todas las direcciones con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de direcciones obtenida exitosamente',
    isArray: true,
    type: Direccion,
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar en la dirección, país, ciudad o código postal',
    example: 'Managua',
  })
  findAll(@Query() filters: FindDireccionesDto) {
    return this.direccionService.findAll(filters);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.conductor, ValidRoles.cliente)
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
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
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
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
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

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
import { FormaArregloService } from './forma-arreglo.service';
import { CreateFormaArregloDto } from './dto/create-forma-arreglo.dto';
import { UpdateFormaArregloDto } from './dto/update-forma-arreglo.dto';
import { FormaArreglo } from './entities/forma-arreglo.entity';
import { FindFormasArregloDto } from './dto/find-formas-arreglo.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Formas de Arreglo')
@Controller('forma-arreglo')
export class FormaArregloController {
  constructor(private readonly formaArregloService: FormaArregloService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Crear una nueva forma de arreglo' })
  @ApiResponse({
    status: 201,
    description: 'Forma de arreglo creada exitosamente',
    type: FormaArreglo,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createFormaArregloDto: CreateFormaArregloDto) {
    return this.formaArregloService.create(createFormaArregloDto);
  }

  @Get('public')
  @ApiOperation({ summary: 'Obtener formas de arreglo activas para catálogo público (sin autenticación)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de formas de arreglo activas',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          idFormaArreglo: { type: 'number', example: 1 },
          descripcion: { type: 'string', example: 'Bouquet' },
        },
      },
    },
  })
  findPublic() {
    return this.formaArregloService.findPublic();
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({
    summary: 'Obtener todas las formas de arreglo con paginación',
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar en la descripción de la forma de arreglo',
    example: 'Centro de mesa',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de formas de arreglo obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/FormaArreglo' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  findAll(@Query() filters: FindFormasArregloDto) {
    return this.formaArregloService.findAll(filters);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Obtener una forma de arreglo por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la forma de arreglo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Forma de arreglo encontrada exitosamente',
    type: FormaArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Forma de arreglo no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.formaArregloService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Actualizar una forma de arreglo' })
  @ApiParam({
    name: 'id',
    description: 'ID de la forma de arreglo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Forma de arreglo actualizada exitosamente',
    type: FormaArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Forma de arreglo no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFormaArregloDto: UpdateFormaArregloDto,
  ) {
    return this.formaArregloService.update(id, updateFormaArregloDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Eliminar una forma de arreglo' })
  @ApiParam({
    name: 'id',
    description: 'ID de la forma de arreglo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Forma de arreglo eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Forma de arreglo no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.formaArregloService.remove(id);
  }
}

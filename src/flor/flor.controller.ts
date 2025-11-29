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
import { FlorService } from './flor.service';
import { CreateFlorDto } from './dto/create-flor.dto';
import { UpdateFlorDto } from './dto/update-flor.dto';
import { Flor } from './entities/flor.entity';
import { FindFloresDto } from './dto/find-flores.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Flores')
@Controller('flor')
export class FlorController {
  constructor(private readonly florService: FlorService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Crear una nueva flor' })
  @ApiResponse({
    status: 201,
    description: 'Flor creada exitosamente',
    type: Flor,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createFlorDto: CreateFlorDto) {
    return this.florService.create(createFlorDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Obtener todas las flores con paginación' })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar en nombre, color o tipo de la flor',
    example: 'Rosa',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de flores obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Flor' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  findAll(@Query() filters: FindFloresDto) {
    return this.florService.findAll(filters);
  }

  @Get('public')
  @ApiOperation({ summary: 'Obtener flores activas para catálogo público (sin autenticación)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de flores activas',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          idFlor: { type: 'number', example: 1 },
          nombre: { type: 'string', example: 'Rosa' },
          color: { type: 'string', example: 'Rojo' },
        },
      },
    },
  })
  findPublic() {
    return this.florService.findPublic();
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Obtener una flor por ID' })
  @ApiParam({ name: 'id', description: 'ID de la flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Flor encontrada exitosamente',
    type: Flor,
  })
  @ApiResponse({
    status: 404,
    description: 'Flor no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.florService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Actualizar una flor' })
  @ApiParam({ name: 'id', description: 'ID de la flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Flor actualizada exitosamente',
    type: Flor,
  })
  @ApiResponse({
    status: 404,
    description: 'Flor no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFlorDto: UpdateFlorDto,
  ) {
    return this.florService.update(id, updateFlorDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Eliminar una flor' })
  @ApiParam({ name: 'id', description: 'ID de la flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Flor eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Flor no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.florService.remove(id);
  }
}

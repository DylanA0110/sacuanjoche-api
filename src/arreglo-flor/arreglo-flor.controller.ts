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
import { ArregloFlorService } from './arreglo-flor.service';
import { CreateArregloFlorDto } from './dto/create-arreglo-flor.dto';
import { UpdateArregloFlorDto } from './dto/update-arreglo-flor.dto';
import { ArregloFlor } from './entities/arreglo-flor.entity';
import { FindArreglosFlorDto } from './dto/find-arreglos-flor.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Arreglo Flores')
@ApiBearerAuth('JWT-auth')
@Controller('arreglo-flor')
export class ArregloFlorController {
  constructor(private readonly arregloFlorService: ArregloFlorService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Crear una nueva arreglo flor' })
  @ApiResponse({
    status: 201,
    description: 'Arreglo flor creada exitosamente',
    type: ArregloFlor,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createArregloFlorDto: CreateArregloFlorDto) {
    return this.arregloFlorService.create(createArregloFlorDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Obtener todas las arreglo flores con paginación' })
  @ApiQuery({
    name: 'q',
    description:
      'Texto a buscar en el nombre del arreglo o de la flor asociada',
    example: 'Rosa',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de arreglo flores obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/ArregloFlor' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  findAll(@Query() filters: FindArreglosFlorDto) {
    return this.arregloFlorService.findAll(filters);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Obtener una arreglo flor por ID' })
  @ApiParam({ name: 'id', description: 'ID de la arreglo flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo flor encontrada exitosamente',
    type: ArregloFlor,
  })
  @ApiResponse({
    status: 404,
    description: 'Arreglo flor no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.arregloFlorService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Actualizar una arreglo flor' })
  @ApiParam({ name: 'id', description: 'ID de la arreglo flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo flor actualizada exitosamente',
    type: ArregloFlor,
  })
  @ApiResponse({
    status: 404,
    description: 'Arreglo flor no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArregloFlorDto: UpdateArregloFlorDto,
  ) {
    return this.arregloFlorService.update(id, updateArregloFlorDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Eliminar una arreglo flor' })
  @ApiParam({ name: 'id', description: 'ID de la arreglo flor', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Arreglo flor eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Arreglo flor no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.arregloFlorService.remove(id);
  }
}

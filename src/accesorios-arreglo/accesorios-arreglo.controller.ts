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
import { AccesoriosArregloService } from './accesorios-arreglo.service';
import { CreateAccesoriosArregloDto } from './dto/create-accesorios-arreglo.dto';
import { UpdateAccesoriosArregloDto } from './dto/update-accesorios-arreglo.dto';
import { AccesoriosArreglo } from './entities/accesorios-arreglo.entity';
import { FindAccesoriosArregloDto } from './dto/find-accesorios-arreglo.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Accesorios Arreglos')
@ApiBearerAuth('JWT-auth')
@Controller('accesorios-arreglo')
export class AccesoriosArregloController {
  constructor(
    private readonly accesoriosArregloService: AccesoriosArregloService,
  ) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Crear una nueva accesorios arreglo' })
  @ApiResponse({
    status: 201,
    description: 'Accesorios arreglo creada exitosamente',
    type: AccesoriosArreglo,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createAccesoriosArregloDto: CreateAccesoriosArregloDto) {
    return this.accesoriosArregloService.create(createAccesoriosArregloDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({
    summary: 'Obtener todas las accesorios arreglos con paginación',
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description:
      'Texto a buscar en la descripción del accesorio o el nombre del arreglo',
    example: 'Ramo Primavera',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de accesorios arreglos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/AccesoriosArreglo' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  findAll(@Query() filters: FindAccesoriosArregloDto) {
    return this.accesoriosArregloService.findAll(filters);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Obtener una accesorios arreglo por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la accesorios arreglo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Accesorios arreglo encontrada exitosamente',
    type: AccesoriosArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Accesorios arreglo no encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accesoriosArregloService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Actualizar una accesorios arreglo' })
  @ApiParam({
    name: 'id',
    description: 'ID de la accesorios arreglo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Accesorios arreglo actualizada exitosamente',
    type: AccesoriosArreglo,
  })
  @ApiResponse({
    status: 404,
    description: 'Accesorios arreglo no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccesoriosArregloDto: UpdateAccesoriosArregloDto,
  ) {
    return this.accesoriosArregloService.update(id, updateAccesoriosArregloDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Eliminar una accesorios arreglo' })
  @ApiParam({
    name: 'id',
    description: 'ID de la accesorios arreglo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Accesorios arreglo eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Accesorios arreglo no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accesoriosArregloService.remove(id);
  }
}

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
import { FolioService } from './folio.service';
import { CreateFolioDto } from './dto/create-folio.dto';
import { UpdateFolioDto } from './dto/update-folio.dto';
import { Folio } from './entities/folio.entity';
import { FindFoliosDto } from './dto/find-folios.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Folios')
@Controller('folio')
export class FolioController {
  constructor(private readonly folioService: FolioService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Crear un nuevo folio' })
  @ApiResponse({
    status: 201,
    description: 'Folio creado exitosamente',
    type: Folio,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createFolioDto: CreateFolioDto) {
    return this.folioService.create(createFolioDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Obtener todos los folios con paginación' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de elementos por página',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Número de elementos a omitir',
    example: 0,
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar en la descripción o documento del folio',
    example: 'FACTURA',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de folios obtenida exitosamente',
    type: [Folio],
  })
  findAll(@Query() filters: FindFoliosDto) {
    return this.folioService.findAll(filters);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Obtener un folio por ID' })
  @ApiParam({ name: 'id', description: 'ID del folio', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Folio encontrado exitosamente',
    type: Folio,
  })
  @ApiResponse({
    status: 404,
    description: 'Folio no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.folioService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Actualizar un folio' })
  @ApiParam({ name: 'id', description: 'ID del folio', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Folio actualizado exitosamente',
    type: Folio,
  })
  @ApiResponse({
    status: 404,
    description: 'Folio no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFolioDto: UpdateFolioDto,
  ) {
    return this.folioService.update(id, updateFolioDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Eliminar un folio' })
  @ApiParam({ name: 'id', description: 'ID del folio', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Folio eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Folio no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.folioService.remove(id);
  }

  @Get('siguiente/:documento')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({
    summary: 'Obtener el siguiente número de folio para un documento',
    description:
      'Obtiene el siguiente número de folio disponible para el tipo de documento especificado y actualiza el último valor.',
  })
  @ApiParam({
    name: 'documento',
    description: 'Tipo de documento (ej: FACTURA, PEDIDO, etc.)',
    example: 'FACTURA',
  })
  @ApiResponse({
    status: 200,
    description: 'Siguiente número de folio obtenido exitosamente',
    schema: {
      type: 'object',
      properties: {
        folio: {
          type: 'string',
          example: 'FAC-0001',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'No existe folio activo para el documento o se alcanzó el valor máximo',
  })
  async obtenerSiguienteFolio(@Param('documento') documento: string) {
    const folio = await this.folioService.obtenerSiguienteFolio(documento);
    return { folio };
  }
}


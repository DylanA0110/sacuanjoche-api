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
import { ContactoEntregaService } from './contacto-entrega.service';
import { CreateContactoEntregaDto } from './dto/create-contacto-entrega.dto';
import { UpdateContactoEntregaDto } from './dto/update-contacto-entrega.dto';
import { ContactoEntrega } from './entities/contacto-entrega.entity';
import { FindContactosEntregaDto } from './dto/find-contactos-entrega.dto';

@ApiTags('Contactos de Entrega')
@Controller('contacto-entrega')
export class ContactoEntregaController {
  constructor(
    private readonly contactoEntregaService: ContactoEntregaService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contacto de entrega' })
  @ApiResponse({
    status: 201,
    description: 'Contacto de entrega creado exitosamente',
    type: ContactoEntrega,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createContactoEntregaDto: CreateContactoEntregaDto) {
    return this.contactoEntregaService.create(createContactoEntregaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los contactos de entrega con paginación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de contactos de entrega obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/ContactoEntrega' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description:
      'Texto a buscar en el nombre, apellido o teléfono del contacto de entrega',
    example: 'María López',
  })
  findAll(@Query() filters: FindContactosEntregaDto) {
    return this.contactoEntregaService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un contacto de entrega por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del contacto de entrega',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Contacto de entrega encontrado exitosamente',
    type: ContactoEntrega,
  })
  @ApiResponse({
    status: 404,
    description: 'Contacto de entrega no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactoEntregaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un contacto de entrega' })
  @ApiParam({
    name: 'id',
    description: 'ID del contacto de entrega',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Contacto de entrega actualizado exitosamente',
    type: ContactoEntrega,
  })
  @ApiResponse({
    status: 404,
    description: 'Contacto de entrega no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContactoEntregaDto: UpdateContactoEntregaDto,
  ) {
    return this.contactoEntregaService.update(id, updateContactoEntregaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contacto de entrega' })
  @ApiParam({
    name: 'id',
    description: 'ID del contacto de entrega',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Contacto de entrega eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Contacto de entrega no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactoEntregaService.remove(id);
  }
}

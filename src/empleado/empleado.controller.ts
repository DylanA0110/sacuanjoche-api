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
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { FindEmpleadosDto } from './dto/find-empleados.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Empleados')
@ApiBearerAuth('JWT-auth')
@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Crear un nuevo empleado' })
  @ApiResponse({
    status: 201,
    description: 'Empleado creado exitosamente',
    type: Empleado,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.create(createEmpleadoDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.conductor)
  @ApiOperation({ summary: 'Obtener todos los empleados con paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empleados obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Empleado' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Texto a buscar en nombres, apellidos o teléfono del empleado',
    example: 'Juan Pérez',
  })
  findAll(@Query() filters: FindEmpleadosDto) {
    return this.empleadoService.findAll(filters);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.conductor)
  @ApiOperation({ summary: 'Obtener un empleado por ID' })
  @ApiParam({ name: 'id', description: 'ID del empleado', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Empleado encontrado exitosamente',
    type: Empleado,
  })
  @ApiResponse({
    status: 404,
    description: 'Empleado no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.empleadoService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.conductor)
  @ApiOperation({ summary: 'Actualizar un empleado' })
  @ApiParam({ name: 'id', description: 'ID del empleado', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Empleado actualizado exitosamente',
    type: Empleado,
  })
  @ApiResponse({
    status: 404,
    description: 'Empleado no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadoService.update(id, updateEmpleadoDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Eliminar un empleado' })
  @ApiParam({ name: 'id', description: 'ID del empleado', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Empleado eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Empleado no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.empleadoService.remove(id);
  }
}

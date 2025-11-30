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
import { EnvioService } from './envio.service';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { Envio } from './entities/envio.entity';
import { FindEnviosDto } from './dto/find-envios.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Envíos')
@ApiBearerAuth('JWT-auth')
@Controller('envio')
export class EnvioController {
  constructor(private readonly envioService: EnvioService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Crear un nuevo envío' })
  @ApiResponse({
    status: 201,
    description: 'Envío creado exitosamente',
    type: Envio,
  })
  create(@Body() createEnvioDto: CreateEnvioDto) {
    return this.envioService.create(createEnvioDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.conductor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Obtener todos los envíos con paginación' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  @ApiQuery({
    name: 'q',
    required: false,
    description:
      'Texto a buscar en estado, pedido o nombre del empleado asignado',
    example: 'Entregado',
  })
  findAll(@Query() filters: FindEnviosDto) {
    return this.envioService.findAll(filters);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.conductor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Obtener un envío por ID' })
  @ApiParam({ name: 'id', description: 'ID del envío', example: 1 })
  @ApiResponse({ status: 200, description: 'Envío encontrado', type: Envio })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.envioService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.conductor)
  @ApiOperation({ summary: 'Actualizar un envío' })
  @ApiParam({ name: 'id', description: 'ID del envío', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Actualizado exitosamente',
    type: Envio,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnvioDto: UpdateEnvioDto,
  ) {
    return this.envioService.update(id, updateEnvioDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Eliminar un envío' })
  @ApiParam({ name: 'id', description: 'ID del envío', example: 1 })
  @ApiResponse({ status: 200, description: 'Eliminado exitosamente' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.envioService.remove(id);
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArregloService } from '../arreglo.service';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Catálogo')
@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly arregloService: ArregloService) {}

  @Get('filtros')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
  @ApiOperation({
    summary: 'Obtener opciones de filtros disponibles para el catálogo',
  })
  @ApiResponse({
    status: 200,
    description: 'Opciones de filtros obtenidas exitosamente',
    schema: {
      type: 'object',
      properties: {
        formasArreglo: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              descripcion: { type: 'string' },
            },
          },
        },
        precios: {
          type: 'object',
          properties: {
            min: { type: 'number' },
            max: { type: 'number' },
          },
        },
        flores: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              nombre: { type: 'string' },
              color: { type: 'string', nullable: true },
            },
          },
        },
      },
    },
  })
  getFiltros() {
    return this.arregloService.getFiltrosDisponibles();
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ForwardGeocodeQueryDto } from './dto/forward-geocode-query.dto';
import { MapboxService } from './mapbox.service';
import { ForwardGeocodeResponse } from './mapbox.interfaces';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Mapbox')
@ApiBearerAuth('JWT-auth')
@Controller('mapbox')
export class MapboxController {
  constructor(private readonly mapboxService: MapboxService) {}

  @Get('geocode')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.conductor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Buscar direcciones usando Mapbox Geocoding.' })
  @ApiResponse({
    status: 200,
    description:
      'Resultados sugeridos junto con la mejor coincidencia (primer elemento).',
    schema: {
      type: 'object',
      properties: {
        primary: {
          type: 'object',
          nullable: true,
          properties: {
            id: { type: 'string', example: 'poi.123' },
            label: {
              type: 'string',
              example: 'Centro Comercial Managua, Managua, Nicaragua',
            },
            lat: { type: 'number', example: 12.136389 },
            lng: { type: 'number', example: -86.251389 },
            country: { type: 'string', example: 'Nicaragua' },
            region: { type: 'string', example: 'Managua' },
            city: { type: 'string', example: 'Managua' },
            neighborhood: { type: 'string', example: 'Roberto Huembes' },
            street: { type: 'string', example: 'Pista Suburbana' },
            postalCode: { type: 'string', example: '14033' },
            accuracy: { type: 'string', example: 'point' },
          },
        },
        results: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'poi.456' },
              label: {
                type: 'string',
                example: 'Iglesia La Merced, Granada, Nicaragua',
              },
              lat: { type: 'number', example: 12.136389 },
              lng: { type: 'number', example: -86.251389 },
              country: { type: 'string', example: 'Nicaragua' },
              region: { type: 'string', example: 'Granada' },
              city: { type: 'string', example: 'Granada' },
              neighborhood: { type: 'string', example: 'Centro Histórico' },
              street: { type: 'string', example: 'Calle Real' },
              postalCode: { type: 'string', example: '43000' },
              accuracy: { type: 'string', example: 'point' },
            },
          },
        },
      },
    },
  })
  forwardGeocode(
    @Query() queryDto: ForwardGeocodeQueryDto,
  ): Promise<ForwardGeocodeResponse> {
    const proximity =
      queryDto.proximityLat !== undefined && queryDto.proximityLng !== undefined
        ? {
            lat: queryDto.proximityLat,
            lng: queryDto.proximityLng,
          }
        : undefined;

    const types = queryDto.types
      ?.split(',')
      .map((value) => value.trim())
      .filter((value) => value.length);

    const bbox =
      queryDto.bbox === undefined
        ? undefined
        : queryDto.bbox.trim().length === 0
          ? null
          : queryDto.bbox;

    return this.mapboxService.forwardGeocode(queryDto.query, {
      limit: queryDto.limit,
      proximity,
      language: queryDto.language,
      country: queryDto.country,
      types,
      bbox,
      fuzzyMatch: queryDto.fuzzyMatch,
      autocomplete: queryDto.autocomplete,
      skipRelaxed: queryDto.skipRelaxed,
    });
  }
}

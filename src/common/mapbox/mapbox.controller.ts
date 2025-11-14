import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForwardGeocodeQueryDto } from './dto/forward-geocode-query.dto';
import { MapboxService } from './mapbox.service';
import { ForwardGeocodeResult } from './mapbox.interfaces';

@ApiTags('Mapbox')
@Controller('mapbox')
export class MapboxController {
  constructor(private readonly mapboxService: MapboxService) {}

  @Get('geocode')
  @ApiOperation({ summary: 'Buscar direcciones usando Mapbox Geocoding.' })
  @ApiResponse({
    status: 200,
    description:
      'Lista de sugerencias con coordenadas y detalles estructurados.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
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
    },
  })
  forwardGeocode(
    @Query() queryDto: ForwardGeocodeQueryDto,
  ): Promise<ForwardGeocodeResult[]> {
    return this.mapboxService.forwardGeocode(queryDto.query, {
      limit: queryDto.limit,
      proximity:
        queryDto.proximityLat !== undefined &&
        queryDto.proximityLng !== undefined
          ? {
              lat: queryDto.proximityLat,
              lng: queryDto.proximityLng,
            }
          : undefined,
    });
  }
}

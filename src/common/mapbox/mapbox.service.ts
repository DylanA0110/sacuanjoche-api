import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import {
  Coordinates,
  ForwardGeocodeResult,
  MapboxLeg,
  MapboxWaypoint,
  OptimizeRouteInput,
  OptimizeRouteResult,
  ReverseGeocodeResult,
} from './mapbox.interfaces';

interface MapboxOptimizedTripsResponse {
  code: string;
  uuid?: string;
  trips?: Array<{
    distance: number;
    duration: number;
    geometry?: string;
    legs: MapboxLeg[];
  }>;
  waypoints: MapboxWaypoint[];
  message?: string;
}

interface MapboxForwardFeature {
  id: string;
  place_name: string;
  place_name_es?: string;
  text: string;
  text_es?: string;
  center: [number, number];
  context?: Array<{
    id: string;
    text: string;
    text_es?: string;
  }>;
  properties?: {
    accuracy?: string;
    address?: string;
    short_code?: string;
  };
}

interface MapboxForwardGeocodingResponse {
  features?: MapboxForwardFeature[];
}

@Injectable()
export class MapboxService {
  private readonly logger = new Logger(MapboxService.name);
  private readonly optimizedTripsBaseUrl =
    'https://api.mapbox.com/optimized-trips/v1/mapbox';
  private readonly geocodingBaseUrl =
    'https://api.mapbox.com/geocoding/v5/mapbox.places';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async optimizeRoute(input: OptimizeRouteInput): Promise<OptimizeRouteResult> {
    const accessToken = this.configService.get<string>('MAPBOX_ACCESS_TOKEN');

    if (!accessToken) {
      throw new InternalServerErrorException(
        'MAPBOX_ACCESS_TOKEN no está configurado en las variables de entorno.',
      );
    }

    if (!input.stops.length) {
      throw new InternalServerErrorException(
        'Se requiere al menos un punto de entrega para optimizar la ruta.',
      );
    }

    const profile =
      input.profile ??
      this.configService.get<string>('MAPBOX_PROFILE') ??
      'driving';
    const coordinates = this.buildCoordinatesString(input.origin, input.stops);

    const params = {
      access_token: accessToken,
      geometries: 'polyline6',
      overview: 'full',
      annotations: 'distance,duration',
      source: 'first',
      destination: input.useRoundTrip ? 'same' : 'last',
      roundtrip: input.useRoundTrip ? 'true' : 'false',
    } as const;

    const { data } = await firstValueFrom(
      this.httpService
        .get<MapboxOptimizedTripsResponse>(
          `${this.optimizedTripsBaseUrl}/${profile}/${coordinates}`,
          {
            params,
          },
        )
        .pipe(
          catchError((error) => {
            this.logger.error(
              'Mapbox optimization failed',
              error?.response?.data || error.message,
            );
            throw new InternalServerErrorException(
              error?.response?.data?.message ||
                'No se pudo optimizar la ruta con Mapbox.',
            );
          }),
        ),
    );

    const trip = data.trips?.[0];
    if (!trip || data.code !== 'Ok') {
      this.logger.error('Respuesta no válida de Mapbox', data);
      throw new InternalServerErrorException(
        'Mapbox no devolvió una ruta optimizada.',
      );
    }

    return {
      distanceKm: Number((trip.distance / 1000).toFixed(2)),
      durationMin: Number((trip.duration / 60).toFixed(2)),
      geometry: trip.geometry ?? null,
      waypoints: data.waypoints,
      legs: trip.legs,
      requestId: data.uuid,
    };
  }

  async forwardGeocode(
    query: string,
    options?: {
      limit?: number;
      proximity?: Coordinates;
    },
  ): Promise<ForwardGeocodeResult[]> {
    const accessToken = this.configService.get<string>('MAPBOX_ACCESS_TOKEN');

    if (!accessToken) {
      throw new InternalServerErrorException(
        'MAPBOX_ACCESS_TOKEN no está configurado en las variables de entorno.',
      );
    }

    const sanitizedQuery = query.trim();
    if (!sanitizedQuery) return [];

    const limit = Math.max(1, Math.min(options?.limit ?? 5, 10));

    // Detecta consultas cortas vs largas
    const isLongQuery =
      sanitizedQuery.length >= 7 || sanitizedQuery.includes(' ');

    // BBOX reducido para MANAGUA
    const managuaBbox = '-86.40,12.03,-86.10,12.20';

    const strictParams: Record<string, string | number> = {
      access_token: accessToken,
      country: 'ni',
      language: 'es',
      limit,
      types: 'poi,address',
      fuzzyMatch: 'false',
      autocomplete: isLongQuery ? 'false' : 'true',
      bbox: managuaBbox,
    };

    if (options?.proximity) {
      strictParams.proximity = `${options.proximity.lng},${options.proximity.lat}`;
    }

    // PRIMER INTENTO — búsqueda estricta
    const strictFeatures = await this.fetchForwardFeatures(
      sanitizedQuery,
      strictParams,
    );

    if (strictFeatures.length > 0) {
      return strictFeatures.map(this.mapForwardFeatureToResult);
    }

    // SEGUNDO INTENTO — relajado (aún dentro de Nicaragua)
    const relaxedParams: Record<string, string | number> = {
      ...strictParams,
      fuzzyMatch: 'true',
      autocomplete: 'true',
      bbox: undefined,
    };
    delete relaxedParams.bbox;

    const relaxedFeatures = await this.fetchForwardFeatures(
      sanitizedQuery,
      relaxedParams,
    );

    if (relaxedFeatures.length > 0) {
      // Filtra para quedarse SOLO con Nicaragua
      const filtered = relaxedFeatures.filter((f) =>
        f.context?.some((c) => {
          if (!c.id.startsWith('country')) return false;
          const txt = c.text_es ?? c.text;
          return txt?.toLowerCase().includes('nicaragua');
        }),
      );

      return filtered.map(this.mapForwardFeatureToResult);
    }

    return [];
  }

  async reverseGeocode(
    coordinates: Coordinates,
    options?: {
      limit?: number;
      types?: string[];
    },
  ): Promise<ReverseGeocodeResult | null> {
    const accessToken = this.configService.get<string>('MAPBOX_ACCESS_TOKEN');

    if (!accessToken) {
      throw new InternalServerErrorException(
        'MAPBOX_ACCESS_TOKEN no está configurado en las variables de entorno.',
      );
    }

    if (
      coordinates.lat === undefined ||
      coordinates.lng === undefined ||
      Number.isNaN(coordinates.lat) ||
      Number.isNaN(coordinates.lng)
    ) {
      throw new InternalServerErrorException(
        'Coordenadas inválidas para el reverse geocoding de Mapbox.',
      );
    }

    const params: Record<string, string | number> = {
      access_token: accessToken,
      language: 'es',
      limit: Math.max(1, Math.min(options?.limit ?? 1, 5)),
      types: options?.types?.length ? options.types.join(',') : 'address,poi',
    };

    const { data } = await firstValueFrom(
      this.httpService
        .get<MapboxForwardGeocodingResponse>(
          `${this.geocodingBaseUrl}/${coordinates.lng},${coordinates.lat}.json`,
          {
            params,
          },
        )
        .pipe(
          catchError((error) => {
            this.logger.error(
              'Mapbox reverse geocoding failed',
              error?.response?.data || error.message,
            );
            throw new InternalServerErrorException(
              error?.response?.data?.message ||
                'No se pudo obtener la dirección desde Mapbox.',
            );
          }),
        ),
    );

    const feature = data.features?.[0];

    if (!feature) {
      this.logger.warn(
        `Mapbox no devolvió resultados para las coordenadas ${coordinates.lat}, ${coordinates.lng}.`,
      );
      return null;
    }

    return this.mapReverseFeatureToResult(feature);
  }

  private buildCoordinatesString(
    origin: Coordinates,
    stops: OptimizeRouteInput['stops'],
  ): string {
    const originCoord = this.formatCoordinate(origin);
    const stopCoords = stops.map((stop) => this.formatCoordinate(stop));
    return [originCoord, ...stopCoords].join(';');
  }

  private formatCoordinate(point: Coordinates): string {
    return `${point.lng},${point.lat}`;
  }

  private async fetchForwardFeatures(
    query: string,
    params: Record<string, string | number>,
  ): Promise<MapboxForwardFeature[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<MapboxForwardGeocodingResponse>(
          `${this.geocodingBaseUrl}/${encodeURIComponent(query)}.json`,
          {
            params,
          },
        )
        .pipe(
          catchError((error) => {
            this.logger.error(
              'Mapbox forward geocoding failed',
              error?.response?.data || error.message,
            );
            throw new InternalServerErrorException(
              error?.response?.data?.message ||
                'No se pudo buscar la dirección en Mapbox.',
            );
          }),
        ),
    );

    return data.features ?? [];
  }

  private mapForwardFeatureToResult(
    feature: MapboxForwardFeature,
  ): ForwardGeocodeResult {
    const label = feature.place_name_es ?? feature.place_name;
    const baseText = feature.text_es ?? feature.text;

    const contextMap = this.buildContextMap(feature);

    const streetNumber = feature.properties?.address;
    const street = streetNumber
      ? `${streetNumber} ${baseText}`.trim()
      : baseText;

    return {
      id: feature.id,
      label,
      lat: feature.center[1],
      lng: feature.center[0],
      country: contextMap.get('country'),
      region: contextMap.get('region') ?? contextMap.get('province'),
      city:
        contextMap.get('place') ??
        contextMap.get('district') ??
        contextMap.get('locality'),
      neighborhood: contextMap.get('neighborhood'),
      street,
      postalCode: contextMap.get('postcode'),
      accuracy: feature.properties?.accuracy,
    };
  }

  private mapReverseFeatureToResult(
    feature: MapboxForwardFeature,
  ): ReverseGeocodeResult {
    const contextMap = this.buildContextMap(feature);

    const formattedAddress = feature.place_name_es ?? feature.place_name;
    const baseStreet = feature.text_es ?? feature.text;
    const houseNumber = feature.properties?.address;

    return {
      formattedAddress,
      country: contextMap.get('country'),
      adminArea:
        contextMap.get('region') ??
        contextMap.get('province') ??
        contextMap.get('district'),
      city:
        contextMap.get('place') ??
        contextMap.get('district') ??
        contextMap.get('locality'),
      neighborhood: contextMap.get('neighborhood'),
      street: baseStreet,
      houseNumber,
      postalCode: contextMap.get('postcode'),
      placeId: feature.id,
      accuracy: feature.properties?.accuracy,
      lat: feature.center[1],
      lng: feature.center[0],
      provider: 'mapbox',
      context: Object.fromEntries(contextMap.entries()),
    };
  }

  private buildContextMap(
    feature: MapboxForwardFeature,
  ): Map<string, string | undefined> {
    const contextMap = new Map<string, string | undefined>();

    feature.context?.forEach((item) => {
      const key = item.id.split('.')[0];
      contextMap.set(key, item.text_es ?? item.text);
    });

    // Algunos resultados incluyen información adicional en properties.
    if (feature.properties?.short_code) {
      contextMap.set('short_code', feature.properties.short_code);
    }

    return contextMap;
  }
}

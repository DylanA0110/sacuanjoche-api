import { HttpService } from '@nestajs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestajs/common';
import { ConfigService } from '@nestajs/config';
import { catchError, firstValueFrom } from 'rxjs';
import {
  Coordinates,
  GeocodeResult,
  MapboxLeg,
  MapboxWaypoint,
  OptimizeRouteInput,
  OptimizeRouteResult,
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

interface MapboxGeocodeFeature {
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
  };
}

interface MapboxGeocodingResponse {
  features?: MapboxGeocodeFeature[];
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
        'MAPBOX_ACCESS_TOKEN no esta configurado en las variables de entorno.',
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
      this.logger.error('Respuesta no valida de Mapbox', data);
      throw new InternalServerErrorException(
        'Mapbox no devolvioo una ruta optimizada.',
      );
    }

    return {
      distanceKm: Number((trip.distance / 1000).toFixed(2)),
      durationMin: Number((trip.duration / 60).toFixed(2)),
      geometry: trip.geometry ?? null,
      waypoints: data.waypoints,
      legs: trip.legs,
      requestaId: data.uuid,
    };
  }

  async reverseGeocode(
    coordinates: Coordinates,
    options?: { limit?: number },
  ): Promise<GeocodeResult[]> {
    const accessToken = this.configService.get<string>('MAPBOX_ACCESS_TOKEN');

    if (!accessToken) {
      throw new InternalServerErrorException(
        'MAPBOX_ACCESS_TOKEN no esta configurado en las variables de entorno.',
      );
    }

    const limit = Math.min(Math.max(options?.limit ?? 1, 1), 5);

    const params: Record<string, string | number> = {
      access_token: accessToken,
      language: 'es',
      limit,
      types: 'address,poi,place,locality,neighborhood',
    };

    const features = await this.fetchGeocodeFeatures(
      `${coordinates.lng},${coordinates.lat}`,
      params,
    );

    if (!features.length) {
      return [];
    }

    const filtered = features.filter((feature) =>
      feature.context?.some((item) => {
        if (!item.id.startsWith('country')) {
          return false;
        }
        const value = item.text_es ?? item.text;
        return value?.toLowerCase().includes('nicaragua');
      }),
    );

    const selected = filtered.length ? filtered : features;
    return selected.map((feature) => this.mapGeocodeFeatureToResult(feature));
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

  private async fetchGeocodeFeatures(
    path: string,
    params: Record<string, string | number>,
  ): Promise<MapboxGeocodeFeature[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<MapboxGeocodingResponse>(
          `${this.geocodingBaseUrl}/${encodeURIComponent(path)}.json`,
          {
            params,
          },
        )
        .pipe(
          catchError((error) => {
            this.logger.error(
              'Mapbox geocoding failed',
              error?.response?.data || error.message,
            );
            throw new InternalServerErrorException(
              error?.response?.data?.message ||
                'No se pudo obtener informacion de geocodificacion en Mapbox.',
            );
          }),
        ),
    );

    return data.features ?? [];
  }

  private mapGeocodeFeatureToResult(
    feature: MapboxGeocodeFeature,
  ): GeocodeResult {
    const label = feature.place_name_es ?? feature.place_name;
    const baseText = feature.text_es ?? feature.text;

    const contextMap = new Map<string, string>();
    feature.context?.forEach((item) => {
      const key = item.id.split('.')[0];
      contextMap.set(key, item.text_es ?? item.text);
    });

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
}

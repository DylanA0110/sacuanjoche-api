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
  ForwardGeocodeOptions,
  ForwardGeocodeResponse,
  ForwardGeocodeResult,
  MapboxLeg,
  MapboxWaypoint,
  OptimizeRouteInput,
  OptimizeRouteResult,
  PointToPointMetrics,
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

interface MapboxDirectionsResponse {
  code?: string;
  message?: string;
  routes?: Array<{
    distance: number;
    duration: number;
    geometry?: string;
  }>;
}

@Injectable()
export class MapboxService {
  private readonly logger = new Logger(MapboxService.name);
  private readonly optimizedTripsBaseUrl =
    'https://api.mapbox.com/optimized-trips/v1/mapbox';
  private readonly geocodingBaseUrl =
    'https://api.mapbox.com/geocoding/v5/mapbox.places';
  private readonly directionsBaseUrl =
    'https://api.mapbox.com/directions/v5/mapbox';

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
    options: ForwardGeocodeOptions = {},
  ): Promise<ForwardGeocodeResponse> {
    const accessToken = this.configService.get<string>('MAPBOX_ACCESS_TOKEN');

    if (!accessToken) {
      throw new InternalServerErrorException(
        'MAPBOX_ACCESS_TOKEN no está configurado en las variables de entorno.',
      );
    }

    const sanitizedQuery = query.trim();
    if (!sanitizedQuery) {
      return { results: [], primary: null };
    }

    const limit = Math.max(1, Math.min(options.limit ?? 5, 10));

    const language = ((options.language ?? 'es').trim() || 'es').toLowerCase();
    const country = ((options.country ?? 'ni').trim() || 'ni').toLowerCase();
    const countryCodes = country
      .split(',')
      .map((code) => code.trim().toLowerCase())
      .filter((code) => code.length);
    const types =
      options.types?.length && options.types.some((value) => value.trim())
        ? options.types
            .map((value) => value.trim().toLowerCase())
            .filter((value) => value.length)
        : ['poi', 'address'];

    const typesParam = Array.from(new Set(types)).join(',');

    const isLongQuery =
      sanitizedQuery.length >= 7 || sanitizedQuery.includes(' ');

    const managuaBbox = '-86.40,12.03,-86.10,12.20';
    const bboxOption =
      options.bbox === undefined
        ? managuaBbox
        : options.bbox === null
          ? undefined
          : options.bbox;

    const autocompleteParam =
      options.autocomplete ?? (isLongQuery ? false : true);
    const fuzzyParam = options.fuzzyMatch ?? false;

    const strictParams: Record<string, string | number | undefined> = {
      access_token: accessToken,
      country,
      language,
      limit,
      types: typesParam,
      fuzzyMatch: fuzzyParam ? 'true' : 'false',
      autocomplete: autocompleteParam ? 'true' : 'false',
      bbox: bboxOption,
    };

    if (options.proximity) {
      strictParams.proximity = `${options.proximity.lng},${options.proximity.lat}`;
    }

    const strictFeatures = await this.fetchForwardFeatures(
      sanitizedQuery,
      strictParams,
    );

    let features = strictFeatures;

    if (!features.length && !options.skipRelaxed) {
      // Allow a relaxed attempt when the strict search returned nothing.
      const relaxedParams: Record<string, string | number | undefined> = {
        ...strictParams,
        fuzzyMatch: 'true',
        autocomplete: 'true',
      };

      if (options.bbox === undefined) {
        delete relaxedParams.bbox;
      }

      features = await this.fetchForwardFeatures(sanitizedQuery, relaxedParams);

      const restrictToNi =
        options.country === undefined ||
        (countryCodes.length === 1 && countryCodes[0] === 'ni');

      if (features.length && restrictToNi) {
        features = features.filter((feature) =>
          feature.context?.some((context) => {
            if (!context.id.startsWith('country')) {
              return false;
            }
            const text = context.text_es ?? context.text;
            return text?.toLowerCase().includes('nicaragua');
          }),
        );
      }
    }

    const results = features.map(this.mapForwardFeatureToResult);

    return {
      results,
      primary: results[0] ?? null,
    };
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

  async getDistanceBetween(
    origin: Coordinates,
    destination: Coordinates,
    profile?: string,
  ): Promise<PointToPointMetrics> {
    const accessToken = this.configService.get<string>('MAPBOX_ACCESS_TOKEN');

    if (!accessToken) {
      throw new InternalServerErrorException(
        'MAPBOX_ACCESS_TOKEN no está configurado en las variables de entorno.',
      );
    }

    const sanitizedOrigin = this.validateCoordinate(origin, 'origen');
    const sanitizedDestination = this.validateCoordinate(
      destination,
      'destino',
    );
    const resolvedProfile =
      profile ?? this.configService.get<string>('MAPBOX_PROFILE') ?? 'driving';

    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<MapboxDirectionsResponse>(
            `${this.directionsBaseUrl}/${resolvedProfile}/${sanitizedOrigin.lng},${sanitizedOrigin.lat};${sanitizedDestination.lng},${sanitizedDestination.lat}`,
            {
              params: {
                access_token: accessToken,
                alternatives: 'false',
                geometries: 'polyline6',
                overview: 'simplified',
                steps: 'false',
              },
            },
          )
          .pipe(
            catchError((error) => {
              this.logger.error(
                'Mapbox directions failed',
                error?.response?.data || error.message,
              );
              throw error;
            }),
          ),
      );

      const route = data.routes?.[0];

      if (route && typeof route.distance === 'number') {
        return {
          distanceKm: Number((route.distance / 1000).toFixed(2)),
          durationMin:
            typeof route.duration === 'number'
              ? Number((route.duration / 60).toFixed(2))
              : null,
          geometry: route.geometry ?? null,
          source: 'mapbox',
        };
      }

      this.logger.warn(
        `Mapbox no devolvió rutas para ${sanitizedOrigin.lat},${sanitizedOrigin.lng} -> ${sanitizedDestination.lat},${sanitizedDestination.lng}.`,
      );
    } catch (error) {
      this.logger.warn(
        `Fallo al obtener la distancia con Mapbox (${resolvedProfile}). Se usará un cálculo aproximado.`,
      );
    }

    const fallbackDistance = this.calculateHaversineDistance(
      sanitizedOrigin,
      sanitizedDestination,
    );

    return {
      distanceKm: Number(fallbackDistance.toFixed(2)),
      durationMin: null,
      geometry: null,
      source: 'haversine',
    };
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
    params: Record<string, string | number | undefined>,
  ): Promise<MapboxForwardFeature[]> {
    const sanitizedParams = this.sanitizeParams(params);

    const { data } = await firstValueFrom(
      this.httpService
        .get<MapboxForwardGeocodingResponse>(
          `${this.geocodingBaseUrl}/${encodeURIComponent(query)}.json`,
          {
            params: sanitizedParams,
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

  private sanitizeParams(
    params: Record<string, string | number | undefined>,
  ): Record<string, string | number> {
    return Object.fromEntries(
      Object.entries(params).filter(([, value]) => {
        if (value === undefined || value === null) {
          return false;
        }
        if (typeof value === 'string') {
          return value.trim().length > 0;
        }
        return true;
      }),
    );
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

  private validateCoordinate(
    value: Coordinates,
    kind: 'origen' | 'destino',
  ): Coordinates {
    const lat = Number(value.lat);
    const lng = Number(value.lng);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      throw new InternalServerErrorException(
        `Coordenadas inválidas para el ${kind} proporcionado.`,
      );
    }

    return { lat, lng };
  }

  private calculateHaversineDistance(a: Coordinates, b: Coordinates): number {
    const toRad = (degrees: number) => (degrees * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const originLatRad = toRad(a.lat);
    const destLatRad = toRad(b.lat);

    const haversine =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) *
        Math.sin(dLng / 2) *
        Math.cos(originLatRad) *
        Math.cos(destLatRad);

    const angularDistance =
      2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
    return earthRadiusKm * angularDistance;
  }
}

export interface Coordinates {
  lat: number;
  lng: number;
  label?: string;
}

export interface OptimizeRouteInput {
  origin: Coordinates;
  stops: Array<Coordinates & { externalId: string }>;
  profile?: string;
  useRoundTrip?: boolean;
}

export interface OptimizeRouteResult {
  distanceKm: number;
  durationMin: number;
  geometry: string | null;
  waypoints: MapboxWaypoint[];
  legs: MapboxLeg[];
  requestId?: string;
}

export interface ForwardGeocodeResult {
  id: string;
  label: string;
  lat: number;
  lng: number;
  country?: string;
  region?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  postalCode?: string;
  accuracy?: string;
}

export interface ReverseGeocodeResult {
  formattedAddress: string;
  country?: string;
  adminArea?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  placeId?: string;
  accuracy?: string;
  lat: number;
  lng: number;
  provider: string;
  context?: Record<string, string | undefined>;
}

export interface MapboxWaypoint {
  name: string;
  location: [number, number];
  waypoint_index: number;
  trips_index?: number;
  distance?: number;
  target?: [number, number];
  original_index?: number;
}

export interface MapboxLeg {
  distance: number;
  duration: number;
}

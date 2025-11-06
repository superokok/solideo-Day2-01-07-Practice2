import { Location, TransitRoute, Recommendation } from '../types';

export class GoogleMapsService {
  private geocoder: google.maps.Geocoder | null = null;
  private directionsService: google.maps.DirectionsService | null = null;
  private placesService: google.maps.places.PlacesService | null = null;

  initialize(map: google.maps.Map) {
    this.geocoder = new google.maps.Geocoder();
    this.directionsService = new google.maps.DirectionsService();
    this.placesService = new google.maps.places.PlacesService(map);
  }

  async geocodeAddress(address: string): Promise<Location> {
    if (!this.geocoder) {
      throw new Error('Geocoder not initialized');
    }

    return new Promise((resolve, reject) => {
      this.geocoder!.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            address: results[0].formatted_address,
            lat: location.lat(),
            lng: location.lng(),
            name: results[0].address_components[0]?.long_name,
          });
        } else {
          reject(new Error(`주소를 찾을 수 없습니다: ${status}`));
        }
      });
    });
  }

  async getDirections(
    origin: Location,
    destination: Location,
    departureTime?: Date
  ): Promise<google.maps.DirectionsResult> {
    if (!this.directionsService) {
      throw new Error('Directions service not initialized');
    }

    return new Promise((resolve, reject) => {
      const request: google.maps.DirectionsRequest = {
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
          modes: [
            google.maps.TransitMode.BUS,
            google.maps.TransitMode.RAIL,
            google.maps.TransitMode.SUBWAY,
          ],
          routingPreference: google.maps.TransitRoutePreference.FEWER_TRANSFERS,
        },
        provideRouteAlternatives: true,
      };

      if (departureTime) {
        request.transitOptions!.departureTime = departureTime;
      }

      this.directionsService!.route(request, (result, status) => {
        if (status === 'OK' && result) {
          resolve(result);
        } else {
          reject(new Error(`경로를 찾을 수 없습니다: ${status}`));
        }
      });
    });
  }

  parseDirectionsToRoutes(directionsResult: google.maps.DirectionsResult): TransitRoute[] {
    const routes: TransitRoute[] = [];

    directionsResult.routes.forEach((route, routeIndex) => {
      route.legs.forEach((leg) => {
        leg.steps?.forEach((step, stepIndex) => {
          if (step.travel_mode === 'TRANSIT' && step.transit) {
            const transit = step.transit;
            const vehicleType = this.mapVehicleType(transit.line.vehicle.type);

            routes.push({
              id: `${routeIndex}-${stepIndex}`,
              type: vehicleType,
              line: transit.line.short_name || transit.line.name,
              departure: transit.departure_stop.name,
              arrival: transit.arrival_stop.name,
              departureTime: transit.departure_time.text,
              arrivalTime: transit.arrival_time.text,
              duration: step.duration?.text || '',
              distance: step.distance?.text,
              provider: transit.line.agencies?.[0]?.name,
              color: transit.line.color ? `#${transit.line.color}` : undefined,
            });
          } else if (step.travel_mode === 'WALKING') {
            routes.push({
              id: `${routeIndex}-walk-${stepIndex}`,
              type: 'walk',
              departure: step.instructions,
              arrival: '',
              departureTime: '',
              arrivalTime: '',
              duration: step.duration?.text || '',
              distance: step.distance?.text,
            });
          }
        });
      });
    });

    return routes;
  }

  private mapVehicleType(vehicleType: google.maps.VehicleType): TransitRoute['type'] {
    switch (vehicleType) {
      case google.maps.VehicleType.BUS:
      case google.maps.VehicleType.INTERCITY_BUS:
        return 'bus';
      case google.maps.VehicleType.SUBWAY:
        return 'subway';
      case google.maps.VehicleType.RAIL:
      case google.maps.VehicleType.HEAVY_RAIL:
      case google.maps.VehicleType.HIGH_SPEED_TRAIN:
      case google.maps.VehicleType.COMMUTER_TRAIN:
        return 'train';
      default:
        return 'bus';
    }
  }

  async searchNearbyPlaces(
    location: Location,
    type: string,
    radius: number = 5000,
    keyword?: string
  ): Promise<Recommendation[]> {
    if (!this.placesService) {
      throw new Error('Places service not initialized');
    }

    return new Promise((resolve, reject) => {
      const request: google.maps.places.PlaceSearchRequest = {
        location: { lat: location.lat, lng: location.lng },
        radius,
        type,
      };

      if (keyword) {
        request.keyword = keyword;
      }

      this.placesService!.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const recommendations: Recommendation[] = results.slice(0, 12).map((place, index) => ({
            id: place.place_id || `place-${index}`,
            name: place.name || 'Unknown',
            type: this.mapPlaceType(type),
            category: place.types?.[0] || type,
            rating: place.rating || 0,
            reviewCount: place.user_ratings_total,
            description: place.vicinity || '',
            location: {
              address: place.vicinity || '',
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
            },
            imageUrl: place.photos?.[0]?.getUrl({ maxWidth: 400 }),
            priceLevel: place.price_level || 2,
            openNow: place.opening_hours?.isOpen(),
            tags: place.types?.slice(0, 3),
          }));
          resolve(recommendations);
        } else {
          reject(new Error(`장소 검색 실패: ${status}`));
        }
      });
    });
  }

  private mapPlaceType(type: string): Recommendation['type'] {
    if (type.includes('restaurant') || type.includes('food')) return 'restaurant';
    if (type.includes('lodging') || type.includes('hotel')) return 'hotel';
    if (type.includes('point_of_interest') || type.includes('tourist')) return 'attraction';
    return 'activity';
  }
}

export const googleMapsService = new GoogleMapsService();

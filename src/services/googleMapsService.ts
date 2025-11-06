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
          });
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });
  }

  async getDirections(
    origin: Location,
    destination: Location,
    travelMode: google.maps.TravelMode = google.maps.TravelMode.TRANSIT
  ): Promise<google.maps.DirectionsResult> {
    if (!this.directionsService) {
      throw new Error('Directions service not initialized');
    }

    return new Promise((resolve, reject) => {
      this.directionsService!.route(
        {
          origin: { lat: origin.lat, lng: origin.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode,
          transitOptions: {
            modes: [
              google.maps.TransitMode.BUS,
              google.maps.TransitMode.RAIL,
              google.maps.TransitMode.TRAIN,
            ],
            routingPreference: google.maps.TransitRoutePreference.FEWER_TRANSFERS,
          },
          provideRouteAlternatives: true,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            resolve(result);
          } else {
            reject(new Error(`Directions request failed: ${status}`));
          }
        }
      );
    });
  }

  parseDirectionsToRoutes(directionsResult: google.maps.DirectionsResult): TransitRoute[] {
    const routes: TransitRoute[] = [];

    directionsResult.routes.forEach((route, routeIndex) => {
      route.legs.forEach((leg, legIndex) => {
        leg.steps?.forEach((step, stepIndex) => {
          if (step.travel_mode === 'TRANSIT' && step.transit) {
            const transit = step.transit;
            routes.push({
              id: `${routeIndex}-${legIndex}-${stepIndex}`,
              type: this.mapTransitVehicleType(transit.line.vehicle.type),
              departure: transit.departure_stop.name,
              arrival: transit.arrival_stop.name,
              departureTime: transit.departure_time.text,
              arrivalTime: transit.arrival_time.text,
              duration: step.duration?.text || '',
              provider: transit.line.agencies?.[0]?.name,
            });
          }
        });
      });
    });

    return routes;
  }

  private mapTransitVehicleType(vehicleType: google.maps.VehicleType): 'bus' | 'train' | 'flight' | 'walk' {
    switch (vehicleType) {
      case google.maps.VehicleType.BUS:
        return 'bus';
      case google.maps.VehicleType.RAIL:
      case google.maps.VehicleType.SUBWAY:
      case google.maps.VehicleType.TRAM:
        return 'train';
      default:
        return 'bus';
    }
  }

  async searchNearbyPlaces(
    location: Location,
    type: string,
    radius: number = 5000
  ): Promise<Recommendation[]> {
    if (!this.placesService) {
      throw new Error('Places service not initialized');
    }

    return new Promise((resolve, reject) => {
      const request = {
        location: { lat: location.lat, lng: location.lng },
        radius,
        type,
      };

      this.placesService!.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const recommendations: Recommendation[] = results.slice(0, 10).map((place, index) => ({
            id: place.place_id || `place-${index}`,
            name: place.name || 'Unknown',
            type: type === 'restaurant' ? 'restaurant' : 'attraction',
            rating: place.rating || 0,
            description: place.vicinity || '',
            location: {
              address: place.vicinity || '',
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
            },
            imageUrl: place.photos?.[0]?.getUrl({ maxWidth: 400 }),
            priceLevel: place.price_level,
          }));
          resolve(recommendations);
        } else {
          reject(new Error(`Places search failed: ${status}`));
        }
      });
    });
  }
}

export const googleMapsService = new GoogleMapsService();

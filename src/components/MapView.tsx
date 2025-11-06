import { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { Location, TransitRoute, Recommendation } from '../types';
import { googleMapsService } from '../services/googleMapsService';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 37.5665,
  lng: 126.9780,
};

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ['places'];

interface MapViewProps {
  origin: Location | null;
  destination: Location | null;
  onRoutesUpdate: (routes: TransitRoute[]) => void;
  onDirectionsUpdate: (result: google.maps.DirectionsResult) => void;
  recommendations: Recommendation[];
}

export default function MapView({
  origin,
  destination,
  onRoutesUpdate,
  onDirectionsUpdate,
  recommendations,
}: MapViewProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    googleMapsService.initialize(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!map || !origin || !destination) return;

    const fetchDirections = async () => {
      try {
        // Geocode origin and destination
        let originLoc = origin;
        let destLoc = destination;

        if (origin.lat === 0 && origin.lng === 0) {
          originLoc = await googleMapsService.geocodeAddress(origin.address);
        }

        if (destination.lat === 0 && destination.lng === 0) {
          destLoc = await googleMapsService.geocodeAddress(destination.address);
        }

        // Get directions
        const result = await googleMapsService.getDirections(originLoc, destLoc);
        setDirections(result);
        onDirectionsUpdate(result);

        // Parse routes
        const routes = googleMapsService.parseDirectionsToRoutes(result);
        onRoutesUpdate(routes);

        // Fit bounds to show entire route
        if (result.routes[0]) {
          const bounds = new google.maps.LatLngBounds();
          result.routes[0].legs.forEach((leg) => {
            leg.steps?.forEach((step) => {
              if (step.start_location) bounds.extend(step.start_location);
              if (step.end_location) bounds.extend(step.end_location);
            });
          });
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
        alert('경로를 찾을 수 없습니다. 다른 주소를 시도해보세요.');
      }
    };

    fetchDirections();
  }, [map, origin, destination, onRoutesUpdate, onDirectionsUpdate]);

  if (loadError) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <p className="text-red-600 font-semibold">지도를 로드하는 중 오류가 발생했습니다</p>
          <p className="text-sm text-gray-600 mt-2">
            Google Maps API 키를 확인해주세요
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">지도를 로드하는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
        fullscreenControl: true,
      }}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: '#4F46E5',
              strokeWeight: 5,
            },
            suppressMarkers: false,
          }}
        />
      )}

      {recommendations.map((rec) => (
        <Marker
          key={rec.id}
          position={{ lat: rec.location.lat, lng: rec.location.lng }}
          title={rec.name}
          icon={{
            url: rec.type === 'restaurant'
              ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
              : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          }}
        />
      ))}
    </GoogleMap>
  );
}

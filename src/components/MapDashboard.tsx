import { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { Location, TransitRoute, Recommendation, UserPreferences } from '../types';
import { googleMapsService } from '../services/googleMapsService';
import { Loader2 } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 37.5665,
  lng: 126.9780,
};

const libraries: ("places" | "geometry")[] = ['places', 'geometry'];

interface Props {
  origin: Location | null;
  destination: Location | null;
  departureTime: Date | null;
  recommendations: Recommendation[];
  onRoutesUpdate: (routes: TransitRoute[]) => void;
  onDirectionsUpdate: (result: google.maps.DirectionsResult) => void;
  onRecommendationsUpdate: (recs: Recommendation[]) => void;
  onLoadingChange: (loading: boolean) => void;
  preferences: UserPreferences;
}

export default function MapDashboard({
  origin,
  destination,
  departureTime,
  recommendations,
  onRoutesUpdate,
  onDirectionsUpdate,
  onRecommendationsUpdate,
  onLoadingChange,
  preferences,
}: Props) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch directions and routes
  useEffect(() => {
    if (!map || !origin || !destination) return;

    const fetchData = async () => {
      onLoadingChange(true);
      setError(null);

      try {
        // Geocode addresses if needed
        let originLoc = origin;
        let destLoc = destination;

        if (origin.lat === 0 && origin.lng === 0) {
          originLoc = await googleMapsService.geocodeAddress(origin.address);
        }

        if (destination.lat === 0 && destination.lng === 0) {
          destLoc = await googleMapsService.geocodeAddress(destination.address);
        }

        // Get directions
        const result = await googleMapsService.getDirections(
          originLoc,
          destLoc,
          departureTime || undefined
        );

        setDirections(result);
        onDirectionsUpdate(result);

        // Parse transit routes
        const routes = googleMapsService.parseDirectionsToRoutes(result);
        onRoutesUpdate(routes);

        // Fit map bounds
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

        // Fetch recommendations near destination
        if (preferences.cuisines.length > 0 || preferences.activities.length > 0) {
          const [restaurants, attractions] = await Promise.all([
            googleMapsService.searchNearbyPlaces(destLoc, 'restaurant', 5000),
            googleMapsService.searchNearbyPlaces(destLoc, 'tourist_attraction', 5000),
          ]);

          const allRecs = [...restaurants, ...attractions];
          onRecommendationsUpdate(allRecs);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : '데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        onLoadingChange(false);
      }
    };

    fetchData();
  }, [map, origin, destination, departureTime, preferences, onRoutesUpdate, onDirectionsUpdate, onRecommendationsUpdate, onLoadingChange]);

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">지도를 로드할 수 없습니다</p>
          <p className="text-sm mt-2">Google Maps API 키를 확인해주세요</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <p className="text-gray-600 mt-4">지도 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        }}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: '#2563eb',
                strokeWeight: 5,
                strokeOpacity: 0.8,
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
              scaledSize: new google.maps.Size(32, 32),
            }}
          />
        ))}
      </GoogleMap>

      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 px-6 py-3 rounded-lg shadow-lg max-w-md">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}

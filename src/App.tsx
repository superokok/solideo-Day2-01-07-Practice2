import { useState } from 'react';
import { TripDetails, TransitRoute, UserPreferences, Recommendation } from './types';
import Header from './components/Header';
import TripInputPanel from './components/TripInputPanel';
import MapDashboard from './components/MapDashboard';
import RoutePanel from './components/RoutePanel';
import RecommendationsPanel from './components/RecommendationsPanel';
import { MapPin } from 'lucide-react';

function App() {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    origin: null,
    destination: null,
    departureTime: null,
    travelDuration: 1,
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    cuisines: [],
    activities: [],
    budget: 'moderate',
    pace: 'moderate',
  });

  const [routes, setRoutes] = useState<TransitRoute[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTripUpdate = (details: TripDetails) => {
    setTripDetails(details);
  };

  const handlePreferencesUpdate = (prefs: UserPreferences) => {
    setPreferences(prefs);
  };

  const handleRoutesUpdate = (newRoutes: TransitRoute[]) => {
    setRoutes(newRoutes);
  };

  const handleRecommendationsUpdate = (newRecs: Recommendation[]) => {
    setRecommendations(newRecs);
  };

  const handleDirectionsUpdate = (_result: google.maps.DirectionsResult) => {
    // Directions result stored in MapDashboard component
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  const hasTrip = tripDetails.origin && tripDetails.destination;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Dashboard */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Trip Input & Preferences */}
        <aside className="w-96 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <TripInputPanel
            tripDetails={tripDetails}
            preferences={preferences}
            onTripUpdate={handleTripUpdate}
            onPreferencesUpdate={handlePreferencesUpdate}
            isLoading={isLoading}
          />
        </aside>

        {/* Center - Map */}
        <main className="flex-1 relative">
          <MapDashboard
            origin={tripDetails.origin}
            destination={tripDetails.destination}
            departureTime={tripDetails.departureTime}
            recommendations={recommendations}
            onRoutesUpdate={handleRoutesUpdate}
            onDirectionsUpdate={handleDirectionsUpdate}
            onRecommendationsUpdate={handleRecommendationsUpdate}
            onLoadingChange={handleLoadingChange}
            preferences={preferences}
          />
        </main>

        {/* Right Sidebar - Routes & Recommendations */}
        <aside className="w-96 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          {hasTrip ? (
            <>
              {/* Routes Section */}
              {routes.length > 0 && (
                <div className="flex-1 overflow-y-auto custom-scrollbar border-b border-gray-200">
                  <RoutePanel routes={routes} />
                </div>
              )}

              {/* Recommendations Section */}
              {recommendations.length > 0 && (
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <RecommendationsPanel recommendations={recommendations} />
                </div>
              )}

              {/* Empty State */}
              {routes.length === 0 && recommendations.length === 0 && !isLoading && (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center text-gray-400">
                    <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">경로를 검색하는 중...</p>
                    <p className="text-sm mt-2">잠시만 기다려주세요</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center text-gray-400">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">여행을 시작하세요</p>
                <p className="text-sm mt-2">출발지와 도착지를 입력해주세요</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;

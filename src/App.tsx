import { useState } from 'react';
import { TripDetails, TransitRoute, Preference, Recommendation } from './types';
import TripForm from './components/TripForm';
import MapView from './components/MapView';
import RouteDisplay from './components/RouteDisplay';
import PreferenceSelector from './components/PreferenceSelector';
import RecommendationList from './components/RecommendationList';
import { Plane } from 'lucide-react';

function App() {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    origin: null,
    destination: null,
    departureTime: '',
    travelDuration: 1,
  });
  const [routes, setRoutes] = useState<TransitRoute[]>([]);
  const [preferences, setPreferences] = useState<Preference>({
    cuisine: [],
    activities: [],
    budget: 'medium',
    pace: 'moderate',
  });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showPreferences, setShowPreferences] = useState(false);

  const handleTripSubmit = (details: TripDetails) => {
    setTripDetails(details);
    setShowPreferences(true);
  };

  const handleRoutesUpdate = (newRoutes: TransitRoute[]) => {
    setRoutes(newRoutes);
  };

  const handleDirectionsUpdate = (_result: google.maps.DirectionsResult) => {
    // Store directions result if needed for future features
  };

  const handlePreferencesSubmit = (prefs: Preference) => {
    setPreferences(prefs);
  };

  const handleRecommendationsUpdate = (recs: Recommendation[]) => {
    setRecommendations(recs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TravelMate</h1>
              <p className="text-sm text-gray-600">당신만의 완벽한 여행을 계획하세요</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Forms */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trip Details Form */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">여행 계획</h2>
              <TripForm onSubmit={handleTripSubmit} initialValues={tripDetails} />
            </div>

            {/* Preferences Form */}
            {showPreferences && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">취향 설정</h2>
                <PreferenceSelector
                  onSubmit={handlePreferencesSubmit}
                  initialPreferences={preferences}
                  destination={tripDetails.destination}
                  onRecommendationsUpdate={handleRecommendationsUpdate}
                />
              </div>
            )}

            {/* Routes Display */}
            {routes.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">대중교통 경로</h2>
                <RouteDisplay routes={routes} />
              </div>
            )}
          </div>

          {/* Center Panel - Map */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">경로 시각화</h2>
              <MapView
                origin={tripDetails.origin}
                destination={tripDetails.destination}
                onRoutesUpdate={handleRoutesUpdate}
                onDirectionsUpdate={handleDirectionsUpdate}
                recommendations={recommendations}
              />
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">추천 장소</h2>
                <RecommendationList recommendations={recommendations} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            © 2025 TravelMate. 모든 권리 보유.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

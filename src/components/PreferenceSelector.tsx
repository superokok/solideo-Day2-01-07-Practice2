import { useState } from 'react';
import { Preference, Recommendation, Location } from '../types';
import { googleMapsService } from '../services/googleMapsService';
import { Utensils, Activity, DollarSign, Gauge } from 'lucide-react';

interface PreferenceSelectorProps {
  onSubmit: (preferences: Preference) => void;
  initialPreferences: Preference;
  destination: Location | null;
  onRecommendationsUpdate: (recommendations: Recommendation[]) => void;
}

const cuisineOptions = [
  '한식', '중식', '일식', '양식', '이탈리안', '프렌치',
  '베트남', '태국', '인도', '멕시칸', '카페', '디저트'
];

const activityOptions = [
  '관광', '쇼핑', '자연', '역사', '문화', '예술',
  '스포츠', '레저', '사진', '맛집투어', '야경', '테마파크'
];

export default function PreferenceSelector({
  onSubmit,
  initialPreferences,
  destination,
  onRecommendationsUpdate,
}: PreferenceSelectorProps) {
  const [cuisine, setCuisine] = useState<string[]>(initialPreferences.cuisine);
  const [activities, setActivities] = useState<string[]>(initialPreferences.activities);
  const [budget, setBudget] = useState<Preference['budget']>(initialPreferences.budget);
  const [pace, setPace] = useState<Preference['pace']>(initialPreferences.pace);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCuisine = (item: string) => {
    setCuisine(prev =>
      prev.includes(item) ? prev.filter(c => c !== item) : [...prev, item]
    );
  };

  const toggleActivity = (item: string) => {
    setActivities(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const preferences: Preference = {
      cuisine,
      activities,
      budget,
      pace,
    };

    onSubmit(preferences);

    // Fetch recommendations based on preferences
    if (destination) {
      try {
        let destLocation = destination;
        if (destination.lat === 0 && destination.lng === 0) {
          destLocation = await googleMapsService.geocodeAddress(destination.address);
        }

        // Fetch restaurants
        const restaurants = await googleMapsService.searchNearbyPlaces(
          destLocation,
          'restaurant',
          5000
        );

        // Fetch tourist attractions
        const attractions = await googleMapsService.searchNearbyPlaces(
          destLocation,
          'tourist_attraction',
          5000
        );

        const allRecommendations = [...restaurants, ...attractions];
        onRecommendationsUpdate(allRecommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cuisine Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <div className="flex items-center space-x-2">
            <Utensils className="w-4 h-4 text-red-600" />
            <span>선호 음식 (복수 선택 가능)</span>
          </div>
        </label>
        <div className="flex flex-wrap gap-2">
          {cuisineOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleCuisine(item)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                cuisine.includes(item)
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-green-600" />
            <span>선호 활동 (복수 선택 가능)</span>
          </div>
        </label>
        <div className="flex flex-wrap gap-2">
          {activityOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleActivity(item)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activities.includes(item)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-yellow-600" />
            <span>예산</span>
          </div>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['low', 'medium', 'high'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setBudget(level)}
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                budget === level
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {level === 'low' ? '저렴' : level === 'medium' ? '중간' : '고급'}
            </button>
          ))}
        </div>
      </div>

      {/* Pace */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-blue-600" />
            <span>여행 속도</span>
          </div>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['relaxed', 'moderate', 'busy'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setPace(level)}
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                pace === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {level === 'relaxed' ? '여유' : level === 'moderate' ? '보통' : '빡빡'}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '추천 장소 검색 중...' : '추천 받기'}
      </button>
    </form>
  );
}

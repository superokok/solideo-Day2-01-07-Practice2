import { useState } from 'react';
import { TripDetails, UserPreferences } from '../types';
import { MapPin, Calendar, Clock, DollarSign, Zap, UtensilsCrossed, Compass } from 'lucide-react';

interface Props {
  tripDetails: TripDetails;
  preferences: UserPreferences;
  onTripUpdate: (details: TripDetails) => void;
  onPreferencesUpdate: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

const cuisineOptions = ['한식', '일식', '중식', '양식', '이탈리안', '프랑스', '멕시칸', '태국', '베트남', '인도', '카페', '디저트'];
const activityOptions = ['관광', '쇼핑', '자연', '역사', '문화', '예술', '스포츠', '레저', '사진', '맛집투어', '야경', '테마파크'];

export default function TripInputPanel({ tripDetails, preferences, onTripUpdate, onPreferencesUpdate, isLoading }: Props) {
  const [origin, setOrigin] = useState(tripDetails.origin?.address || '');
  const [destination, setDestination] = useState(tripDetails.destination?.address || '');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [duration, setDuration] = useState(tripDetails.travelDuration);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const departureDateTime = departureDate && departureTime
      ? new Date(`${departureDate}T${departureTime}`)
      : null;

    onTripUpdate({
      origin: origin ? { address: origin, lat: 0, lng: 0 } : null,
      destination: destination ? { address: destination, lat: 0, lng: 0 } : null,
      departureTime: departureDateTime,
      travelDuration: duration,
    });
  };

  const toggleCuisine = (cuisine: string) => {
    const newCuisines = preferences.cuisines.includes(cuisine)
      ? preferences.cuisines.filter(c => c !== cuisine)
      : [...preferences.cuisines, cuisine];
    onPreferencesUpdate({ ...preferences, cuisines: newCuisines });
  };

  const toggleActivity = (activity: string) => {
    const newActivities = preferences.activities.includes(activity)
      ? preferences.activities.filter(a => a !== activity)
      : [...preferences.activities, activity];
    onPreferencesUpdate({ ...preferences, activities: newActivities });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {/* Trip Details Form */}
        <div className="mb-8">
          <h2 className="section-header text-blue-600">
            <MapPin className="w-5 h-5" />
            여행 계획
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                출발지
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="예: 서울역"
                className="input-field"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                도착지
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="예: 부산역"
                className="input-field"
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  출발 날짜
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="input-field text-sm"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  출발 시간
                </label>
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="input-field text-sm"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                여행 기간 (일)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="input-field"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  검색 중...
                </span>
              ) : (
                '경로 검색'
              )}
            </button>
          </form>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <h2 className="section-header text-purple-600">
            <UtensilsCrossed className="w-5 h-5" />
            음식 취향
          </h2>
          <div className="flex flex-wrap gap-2">
            {cuisineOptions.map((cuisine) => (
              <button
                key={cuisine}
                type="button"
                onClick={() => toggleCuisine(cuisine)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  preferences.cuisines.includes(cuisine)
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="section-header text-green-600">
            <Compass className="w-5 h-5" />
            선호 활동
          </h2>
          <div className="flex flex-wrap gap-2">
            {activityOptions.map((activity) => (
              <button
                key={activity}
                type="button"
                onClick={() => toggleActivity(activity)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  preferences.activities.includes(activity)
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        {/* Budget & Pace */}
        <div className="space-y-6">
          <div>
            <h2 className="section-header text-orange-600">
              <DollarSign className="w-5 h-5" />
              예산
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {(['budget', 'moderate', 'luxury'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => onPreferencesUpdate({ ...preferences, budget: level })}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    preferences.budget === level
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level === 'budget' ? '💰 절약' : level === 'moderate' ? '💵 보통' : '💎 럭셔리'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-header text-blue-600">
              <Zap className="w-5 h-5" />
              여행 속도
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {(['relaxed', 'moderate', 'fast'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => onPreferencesUpdate({ ...preferences, pace: level })}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    preferences.pace === level
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level === 'relaxed' ? '🌴 여유' : level === 'moderate' ? '🚶 보통' : '🏃 빠르게'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

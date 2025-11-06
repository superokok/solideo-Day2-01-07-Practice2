import { useState } from 'react';
import { TripDetails } from '../types';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface TripFormProps {
  onSubmit: (details: TripDetails) => void;
  initialValues: TripDetails;
}

export default function TripForm({ onSubmit, initialValues }: TripFormProps) {
  const [origin, setOrigin] = useState(initialValues.origin?.address || '');
  const [destination, setDestination] = useState(initialValues.destination?.address || '');
  const [departureTime, setDepartureTime] = useState(initialValues.departureTime || '');
  const [travelDuration, setTravelDuration] = useState(initialValues.travelDuration || 1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create trip details with geocoding to be done in MapView
      const details: TripDetails = {
        origin: origin ? { address: origin, lat: 0, lng: 0 } : null,
        destination: destination ? { address: destination, lat: 0, lng: 0 } : null,
        departureTime,
        travelDuration,
      };
      onSubmit(details);
    } catch (error) {
      console.error('Error submitting trip details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Origin Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>출발지</span>
          </div>
        </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="예: 서울역"
          className="input-field"
          required
        />
      </div>

      {/* Destination Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span>도착지</span>
          </div>
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="예: 부산역"
          className="input-field"
          required
        />
      </div>

      {/* Departure Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-green-600" />
            <span>출발 시간</span>
          </div>
        </label>
        <input
          type="datetime-local"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          className="input-field"
          required
        />
      </div>

      {/* Travel Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <span>여행 기간 (일)</span>
          </div>
        </label>
        <input
          type="number"
          min="1"
          max="30"
          value={travelDuration}
          onChange={(e) => setTravelDuration(parseInt(e.target.value))}
          className="input-field"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '처리 중...' : '경로 검색'}
      </button>
    </form>
  );
}

import { Recommendation } from '../types';
import { Star, MapPin, DollarSign } from 'lucide-react';

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export default function RecommendationList({ recommendations }: RecommendationListProps) {
  const renderPriceLevel = (level?: number) => {
    if (!level) return null;
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: level }).map((_, i) => (
          <DollarSign key={i} className="w-3 h-3 text-green-600" />
        ))}
      </div>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>취향을 선택하고 추천을 받아보세요</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recommendations.map((rec) => (
        <div
          key={rec.id}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
        >
          {rec.imageUrl && (
            <div className="relative h-48 bg-gray-200">
              <img
                src={rec.imageUrl}
                alt={rec.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold">
                {rec.type === 'restaurant' ? '맛집' : '관광지'}
              </div>
            </div>
          )}

          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg text-gray-900 flex-1 mr-2">
                {rec.name}
              </h3>
              {rec.rating > 0 && renderStars(rec.rating)}
            </div>

            <div className="flex items-start space-x-2 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{rec.description}</span>
            </div>

            {rec.priceLevel && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">가격대</span>
                {renderPriceLevel(rec.priceLevel)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

import { Recommendation } from '../types';
import { Star, MapPin, DollarSign } from 'lucide-react';

interface Props {
  recommendations: Recommendation[];
}

export default function RecommendationsPanel({ recommendations }: Props) {
  const renderPriceLevel = (level: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <DollarSign
            key={i}
            className={`w-3 h-3 ${i < level ? 'text-green-600 fill-green-600' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const getTypeIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'restaurant':
        return '🍽️';
      case 'attraction':
        return '🎭';
      case 'hotel':
        return '🏨';
      case 'activity':
        return '🎯';
      default:
        return '📍';
    }
  };

  const getTypeLabel = (type: Recommendation['type']) => {
    switch (type) {
      case 'restaurant':
        return '맛집';
      case 'attraction':
        return '관광지';
      case 'hotel':
        return '숙소';
      case 'activity':
        return '액티비티';
      default:
        return '장소';
    }
  };

  return (
    <div className="p-6">
      <h2 className="section-header text-purple-600">
        <Star className="w-5 h-5 fill-purple-600" />
        AI 추천 장소
      </h2>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="card-compact hover:shadow-lg transition-all group">
            {/* Image */}
            {rec.imageUrl && (
              <div className="relative h-40 -mx-4 -mt-4 mb-4 overflow-hidden rounded-t-lg">
                <img
                  src={rec.imageUrl}
                  alt={rec.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                  {getTypeIcon(rec.type)} {getTypeLabel(rec.type)}
                </div>
                {rec.openNow !== undefined && (
                  <div
                    className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold shadow-md ${
                      rec.openNow ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {rec.openNow ? '영업 중' : '영업 종료'}
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-base text-gray-900 flex-1 leading-tight">
                  {rec.name}
                </h3>
                {rec.rating > 0 && (
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-sm">{rec.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {rec.reviewCount && (
                <p className="text-xs text-gray-500 mb-2">리뷰 {rec.reviewCount.toLocaleString()}개</p>
              )}

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{rec.description}</p>

              {/* Tags */}
              {rec.tags && rec.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {rec.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate max-w-[150px]">{rec.location.address}</span>
                </div>
                {rec.priceLevel && renderPriceLevel(rec.priceLevel)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {recommendations.length > 0 && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 font-medium">추천 장소</span>
            <span className="text-purple-600 font-bold">{recommendations.length}곳</span>
          </div>
        </div>
      )}
    </div>
  );
}

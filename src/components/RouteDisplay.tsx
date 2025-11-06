import { TransitRoute } from '../types';
import { Bus, Train, Plane, Navigation } from 'lucide-react';

interface RouteDisplayProps {
  routes: TransitRoute[];
}

export default function RouteDisplay({ routes }: RouteDisplayProps) {
  const getIcon = (type: TransitRoute['type']) => {
    switch (type) {
      case 'bus':
        return <Bus className="w-5 h-5" />;
      case 'train':
        return <Train className="w-5 h-5" />;
      case 'flight':
        return <Plane className="w-5 h-5" />;
      default:
        return <Navigation className="w-5 h-5" />;
    }
  };

  const getColor = (type: TransitRoute['type']) => {
    switch (type) {
      case 'bus':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'train':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'flight':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (routes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>경로를 검색하면 대중교통 정보가 표시됩니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {routes.map((route) => (
        <div
          key={route.id}
          className={`p-4 rounded-lg border-2 ${getColor(route.type)} transition-all hover:shadow-md`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getIcon(route.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm uppercase">
                  {route.type === 'bus' ? '버스' : route.type === 'train' ? '기차/지하철' : '항공'}
                </span>
                <span className="text-xs font-medium">{route.duration}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <span className="font-medium mr-2">출발:</span>
                  <span className="truncate">{route.departure}</span>
                  <span className="ml-auto text-xs whitespace-nowrap">{route.departureTime}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium mr-2">도착:</span>
                  <span className="truncate">{route.arrival}</span>
                  <span className="ml-auto text-xs whitespace-nowrap">{route.arrivalTime}</span>
                </div>
              </div>

              {route.provider && (
                <div className="mt-2 text-xs text-gray-600">
                  운영: {route.provider}
                </div>
              )}

              {route.price && (
                <div className="mt-2 text-sm font-semibold">
                  요금: {route.price.toLocaleString()}원
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">총 구간</span>
          <span className="font-semibold">{routes.length}개</span>
        </div>
      </div>
    </div>
  );
}

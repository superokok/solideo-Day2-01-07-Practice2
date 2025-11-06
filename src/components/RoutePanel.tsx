import { TransitRoute } from '../types';
import { Bus, Train, Plane, Navigation2, Clock } from 'lucide-react';

interface Props {
  routes: TransitRoute[];
}

export default function RoutePanel({ routes }: Props) {
  const getIcon = (type: TransitRoute['type']) => {
    switch (type) {
      case 'bus':
        return <Bus className="w-5 h-5" />;
      case 'train':
        return <Train className="w-5 h-5" />;
      case 'subway':
        return <Train className="w-5 h-5" />;
      case 'flight':
        return <Plane className="w-5 h-5" />;
      default:
        return <Navigation2 className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: TransitRoute['type']) => {
    switch (type) {
      case 'bus':
        return '버스';
      case 'train':
        return '기차';
      case 'subway':
        return '지하철';
      case 'flight':
        return '항공';
      case 'walk':
        return '도보';
      default:
        return type;
    }
  };

  const getTypeColor = (type: TransitRoute['type']) => {
    switch (type) {
      case 'bus':
        return 'transit-bus';
      case 'train':
        return 'transit-train';
      case 'subway':
        return 'transit-subway';
      case 'flight':
        return 'transit-flight';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <h2 className="section-header text-blue-600">
        <Navigation2 className="w-5 h-5" />
        대중교통 경로
      </h2>

      <div className="space-y-3">
        {routes.map((route, index) => (
          <div
            key={route.id}
            className={`card-compact border-2 ${getTypeColor(route.type)} hover:shadow-md transition-all`}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {getIcon(route.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{getTypeLabel(route.type)}</span>
                    {route.line && (
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold text-white"
                        style={{ backgroundColor: route.color || '#666' }}
                      >
                        {route.line}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {route.duration}
                  </span>
                </div>

                {route.type !== 'walk' ? (
                  <>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">출발</span>
                        <span className="font-medium truncate">{route.departure}</span>
                        <span className="ml-auto text-xs text-gray-600">{route.departureTime}</span>
                      </div>
                      <div className="border-l-2 border-gray-300 ml-2 h-3"></div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">도착</span>
                        <span className="font-medium truncate">{route.arrival}</span>
                        <span className="ml-auto text-xs text-gray-600">{route.arrivalTime}</span>
                      </div>
                    </div>

                    {route.provider && (
                      <p className="text-xs text-gray-500 mt-2">운영: {route.provider}</p>
                    )}
                  </>
                ) : (
                  <div className="text-sm text-gray-600">
                    <p className="line-clamp-2" dangerouslySetInnerHTML={{ __html: route.departure }}></p>
                    {route.distance && (
                      <p className="text-xs text-gray-500 mt-1">{route.distance}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Step Number */}
            <div className="absolute -left-3 -top-3 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 font-medium">총 구간</span>
          <span className="text-blue-600 font-bold">{routes.length}개</span>
        </div>
      </div>
    </div>
  );
}

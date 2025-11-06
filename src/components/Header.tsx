import { Plane, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Plane className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                TravelMate Premium
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </h1>
              <p className="text-sm text-blue-100">AI 기반 스마트 여행 플래너</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm text-blue-100">실시간 대중교통 연계</p>
              <p className="text-xs text-blue-200">Google Maps 기반</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

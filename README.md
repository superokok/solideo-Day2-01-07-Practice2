# TravelMate - 여행 개인화 앱

완벽한 여행을 계획하는 스마트한 방법! TravelMate는 실시간 대중교통 정보와 개인화된 추천을 제공하는 프리미엄 여행 플래닝 애플리케이션입니다.

![TravelMate](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6.svg?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.1-646CFF.svg?logo=vite)

## 주요 기능

### 1. 스마트 경로 계획
- 출발지와 도착지를 입력하면 실시간으로 최적의 대중교통 경로를 찾아드립니다
- 버스, 기차, 지하철 등 다양한 교통수단을 통합 검색
- 출발 시간 및 여행 기간 설정 가능

### 2. 실시간 경로 시각화
- Google Maps API를 활용한 인터랙티브 지도
- 경로를 지도 위에 직관적으로 표시
- 각 교통 구간별 상세 정보 제공

### 3. 개인화된 추천
- 사용자의 취향에 맞는 맛집 추천
- 관광지 및 액티비티 추천
- 예산과 여행 속도에 따른 맞춤형 제안

### 4. 직관적인 UI/UX
- 모던하고 세련된 디자인
- 반응형 레이아웃으로 모바일/태블릿 지원
- 부드러운 애니메이션과 트랜지션

## 기술 스택

### Frontend
- **React 19.2.0** - 최신 React 기능 활용
- **TypeScript 5.9.3** - 타입 안정성
- **Vite 7.2.1** - 초고속 개발 환경
- **Tailwind CSS 4.1.16** - 유틸리티 기반 스타일링

### 외부 API
- **Google Maps API** - 지도 및 경로 시각화
- **Google Places API** - 장소 검색 및 추천
- **Google Directions API** - 실시간 경로 안내

### UI 라이브러리
- **Lucide React** - 아이콘
- **@react-google-maps/api** - React용 Google Maps 통합

## 설치 및 실행

### 1. 저장소 클론

\`\`\`bash
git clone https://github.com/superokok/solideo-Day2-01-07-Practice2.git
cd solideo-Day2-01-07-Practice2
\`\`\`

### 2. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 3. Google Maps API 키 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. Maps JavaScript API, Places API, Directions API 활성화
3. API 키 생성
4. 프로젝트 루트에 `.env` 파일 생성:

\`\`\`env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
\`\`\`

### 4. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 `http://localhost:3000` 접속

### 5. 프로덕션 빌드

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 사용 방법

### 1단계: 여행 정보 입력
- 출발지와 도착지를 입력합니다 (예: "서울역", "부산역")
- 출발 시간을 선택합니다
- 여행 기간을 일 단위로 입력합니다
- "경로 검색" 버튼을 클릭합니다

### 2단계: 경로 확인
- 지도에서 추천된 경로를 확인합니다
- 좌측 패널에서 각 교통 구간의 상세 정보를 확인합니다
- 출발/도착 시간, 소요 시간, 운영 업체 등을 한눈에 볼 수 있습니다

### 3단계: 취향 설정
- 선호하는 음식 종류를 선택합니다 (복수 선택 가능)
- 원하는 활동을 선택합니다 (관광, 쇼핑, 자연 등)
- 예산 수준을 설정합니다 (저렴/중간/고급)
- 여행 속도를 선택합니다 (여유/보통/빡빡)
- "추천 받기" 버튼을 클릭합니다

### 4단계: 추천 장소 탐색
- 도착지 주변의 맛집과 관광지 추천을 확인합니다
- 각 장소의 평점, 위치, 가격대를 확인합니다
- 지도에서 추천 장소의 위치를 시각적으로 확인합니다

## 프로젝트 구조

\`\`\`
solideo-Day2-01-07-Practice2/
├── src/
│   ├── components/
│   │   ├── TripForm.tsx           # 여행 정보 입력 폼
│   │   ├── MapView.tsx            # Google Maps 지도 컴포넌트
│   │   ├── RouteDisplay.tsx       # 경로 표시 컴포넌트
│   │   ├── PreferenceSelector.tsx # 취향 선택 컴포넌트
│   │   └── RecommendationList.tsx # 추천 장소 리스트
│   ├── services/
│   │   └── googleMapsService.ts   # Google Maps API 서비스
│   ├── types/
│   │   └── index.ts               # TypeScript 타입 정의
│   ├── App.tsx                    # 메인 앱 컴포넌트
│   ├── main.tsx                   # 앱 진입점
│   └── index.css                  # 전역 스타일
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
\`\`\`

## 주요 컴포넌트 설명

### TripForm
여행 출발지, 도착지, 시간, 기간을 입력받는 폼 컴포넌트입니다.

### MapView
Google Maps를 통합하여 경로를 시각화하고 추천 장소를 마커로 표시합니다.

### RouteDisplay
각 교통 구간의 상세 정보를 카드 형태로 보기 좋게 표시합니다.

### PreferenceSelector
사용자의 음식, 활동, 예산, 여행 속도 취향을 선택받습니다.

### RecommendationList
Google Places API를 통해 받은 맛집과 관광지 추천을 그리드 레이아웃으로 표시합니다.

## API 서비스

### GoogleMapsService
Google Maps API와의 모든 상호작용을 관리하는 서비스 클래스입니다.

**주요 메서드:**
- `geocodeAddress()` - 주소를 위도/경도로 변환
- `getDirections()` - 두 지점 간의 경로 검색
- `parseDirectionsToRoutes()` - 경로 데이터를 UI에 맞게 파싱
- `searchNearbyPlaces()` - 주변 장소 검색

## 향후 개발 계획

- [ ] 다국어 지원 (영어, 일본어, 중국어)
- [ ] 실시간 교통 상황 반영
- [ ] 항공편 통합 검색
- [ ] 숙박 시설 추천
- [ ] 여행 일정 저장 및 공유 기능
- [ ] 오프라인 지도 지원
- [ ] 날씨 정보 통합
- [ ] 사용자 리뷰 시스템
- [ ] AI 기반 맞춤형 일정 자동 생성

## 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 기여

이슈나 풀 리퀘스트는 언제나 환영합니다!

## 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

---

**만든 이:** TravelMate Team
**버전:** 1.0.0
**최종 업데이트:** 2025년 1월

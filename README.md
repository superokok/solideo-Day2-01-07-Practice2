# 🌍 TravelMate Premium - AI 기반 스마트 여행 플래너

완벽한 여행을 위한 프리미엄 플래닝 솔루션! 실시간 대중교통 연계, AI 맞춤 추천, 직관적인 대시보드로 한 눈에 모든 여행 정보를 확인하세요.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6.svg?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.1-646CFF.svg?logo=vite)

## ✨ 주요 기능

### 🗺️ 실시간 경로 시각화
- **Google Maps 완벽 통합**: 실시간 대중교통 정보 연계
- **다중 교통수단 지원**: 버스, 지하철, 기차, 도보 통합
- **스마트 경로 추천**: 최적의 환승 경로 자동 계산
- **인터랙티브 맵**: 줌, 드래그로 자유로운 지도 탐색

### 🎯 AI 맞춤 추천
- **개인화된 맛집 추천**: 음식 취향 기반 레스토랑 추천
- **관광지 큐레이션**: 선호 활동에 맞는 명소 추천
- **평점 및 리뷰**: 실시간 사용자 평가 정보
- **영업 시간 표시**: 현재 영업 중인 장소 실시간 확인

### 📊 원스톱 대시보드
- **3단 레이아웃**: 입력 - 지도 - 결과를 한 화면에
- **실시간 업데이트**: 입력 즉시 결과 표시
- **스마트 스크롤**: 각 패널 독립적 스크롤
- **반응형 디자인**: 모든 기기에서 완벽한 UX

### ⚡ 프리미엄 UX
- **직관적 입력**: 간단한 폼으로 빠른 검색
- **취향 선택**: 원클릭으로 음식·활동 선택
- **예산 맞춤**: 저렴/보통/럭셔리 옵션
- **속도 조절**: 여유/보통/빠르게 여행 스타일

## 🚀 빠른 시작

### 사전 요구사항

- 웹 브라우저 (Chrome, Firefox, Safari 등)
- Google Maps API 키 (필수)
- 로컬 웹 서버 (개발용) 또는 GitHub Pages

### 설치 방법

#### 1. 저장소 클론

\`\`\`bash
git clone https://github.com/superokok/solideo-Day2-01-07-Practice2.git
cd solideo-Day2-01-07-Practice2
\`\`\`

#### 2. Google Maps API 키 설정

**API 키 발급:**
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성
3. "APIs & Services" → "Library"
4. 다음 API 활성화:
   - ✅ Maps JavaScript API
   - ✅ Places API
   - ✅ Directions API
   - ✅ Geocoding API
5. "Credentials" → "Create Credentials" → "API Key"
6. API 키 복사

**API 키 입력:**

\`index.html\` 파일을 열어서 10번째 줄의 \`YOUR_GOOGLE_MAPS_API_KEY\`를 실제 API 키로 교체:

\`\`\`html
<!-- 수정 전 -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places,geometry&callback=initMap" async defer></script>

<!-- 수정 후 -->
<script src="https://maps.googleapis.com/maps/api/js?key=실제_API_키&libraries=places,geometry&callback=initMap" async defer></script>
\`\`\`

#### 3. 로컬에서 실행

**방법 1: Python 간이 서버 (추천)**
\`\`\`bash
# Python 3 사용
python -m http.server 8000

# 또는 Python 2 사용
python -m SimpleHTTPServer 8000
\`\`\`
✅ 브라우저에서 **http://localhost:8000** 접속

**방법 2: VS Code Live Server**
- VS Code에서 프로젝트 열기
- Live Server 확장 설치
- index.html 우클릭 → "Open with Live Server"

**방법 3: Node.js http-server**
\`\`\`bash
npx http-server -p 8000
\`\`\`

#### 4. GitHub Pages 배포

1. GitHub 저장소의 Settings → Pages
2. Source: "Deploy from a branch" 선택
3. Branch: main 또는 원하는 브랜치 선택
4. 폴더: / (root) 선택
5. Save 클릭
6. 몇 분 후 https://사용자명.github.io/저장소명 에서 확인

## 📖 사용 방법

### 1단계: 여행 정보 입력
**좌측 패널 - 여행 계획**
- 📍 출발지: "서울역", "강남역" 등
- 📍 도착지: "부산역", "제주공항" 등
- 📅 출발 날짜 선택
- 🕐 출발 시간 선택
- ⏱️ 여행 기간 (일 단위)
- 🔍 "경로 검색" 버튼 클릭

### 2단계: 취향 설정
**좌측 패널 - 취향 설정**
- 🍽️ **음식**: 한식, 일식, 중식, 양식 등 선택
- 🎯 **활동**: 관광, 쇼핑, 자연, 문화 등 선택
- 💰 **예산**: 절약/보통/럭셔리
- ⚡ **속도**: 여유/보통/빠르게

### 3단계: 결과 확인
**중앙 지도**
- 🗺️ 실시간 경로 시각화
- 📍 추천 장소 마커 표시
- 🔍 줌/드래그로 자유 탐색

**우측 패널 - 경로**
- 🚌 버스/지하철/기차 정보
- ⏰ 출발/도착 시간
- 🔄 환승 정보
- 💵 예상 요금

**우측 패널 - 추천**
- ⭐ 평점 높은 맛집
- 🎭 인기 관광지
- 📸 이미지 미리보기
- 🏷️ 가격대 정보

## 🎨 기술 스택

### Frontend
- **Vanilla JavaScript (ES6+)** - 순수 자바스크립트, 빌드 도구 불필요
- **HTML5** - 시맨틱 마크업
- **CSS3** - CSS Grid, Flexbox, Custom Properties

### UI/UX
- **Font Awesome 6.4.0** - 아이콘 라이브러리 (CDN)
- **CSS Animations** - 부드러운 전환 효과
- **Responsive Design** - 모바일 완벽 지원

### API & Services
- **Google Maps JavaScript API** - 지도 및 경로 (CDN)
- **Google Places API** - 장소 검색 및 정보
- **Google Directions API** - 경로 안내
- **Google Geocoding API** - 주소 변환

### 배포
- **GitHub Pages** - 무료 정적 호스팅
- **빌드 없이 즉시 배포** - 파일 업로드만으로 완료

## 📂 프로젝트 구조

\`\`\`
travelmate-premium/
├── css/
│   └── style.css                      # 전체 스타일시트
├── js/
│   ├── config.js                      # 앱 설정 및 상태 관리
│   ├── maps.js                        # Google Maps API 통합
│   ├── ui.js                          # UI 렌더링 및 DOM 조작
│   └── app.js                         # 메인 애플리케이션 로직
├── images/                            # 이미지 폴더 (선택사항)
├── index.html                         # 메인 HTML 파일
└── README.md                          # 프로젝트 설명
\`\`\`

**파일 설명:**
- **index.html** - 메인 진입점, 3단 대시보드 레이아웃 정의
- **css/style.css** - CSS Grid 기반 반응형 스타일
- **js/config.js** - 음식/활동/예산/속도 옵션 및 앱 상태
- **js/maps.js** - Google Maps, Places, Directions API 통합
- **js/ui.js** - 태그, 버튼, 카드 렌더링 함수
- **js/app.js** - 폼 제출 및 이벤트 핸들러

## 🎯 핵심 기능 모듈

### 설정 관리 (config.js)
- 음식/활동 옵션 정의 (각 12개)
- 예산 3단계 (절약/보통/럭셔리)
- 속도 3단계 (여유/보통/빠르게)
- 교통수단별 색상/아이콘 설정
- 앱 전역 상태 관리

### 지도 통합 (maps.js)
- Google Maps 초기화 및 설정
- 주소 → 좌표 변환 (Geocoding)
- 대중교통 경로 검색 (Directions)
- 주변 장소 검색 (Places)
- 마커 및 경로 시각화

### UI 렌더링 (ui.js)
- 동적 태그 생성 (음식/활동)
- 버튼 그룹 생성 (예산/속도)
- 경로 카드 렌더링 (버스/지하철/기차)
- 추천 카드 렌더링 (이미지/평점/가격)
- 로딩/에러 상태 표시

### 앱 로직 (app.js)
- 폼 제출 처리
- 비동기 API 호출 순서 제어
- 에러 핸들링
- 사용자 피드백 관리

## 🔧 문제 해결

### API 키 오류
\`\`\`
Google Maps API error: InvalidKeyMapError
\`\`\`
**해결:**
- index.html 파일의 API 키가 올바른지 확인
- Google Cloud Console에서 필요한 API가 모두 활성화되었는지 확인
- API 키 제한 설정 확인 (HTTP referrers 등)

### 경로 검색 실패
\`\`\`
Error: No routes found
\`\`\`
**해결:**
- 출발지/도착지 주소를 더 구체적으로 입력
- 대중교통이 운행되는 시간인지 확인
- 예시: "서울역", "강남역", "부산역" 등 명확한 장소명 사용

### 지도가 로드되지 않음
**해결:**
- 브라우저 개발자 도구(F12) 콘솔 확인
- API 키가 올바르게 입력되었는지 확인
- 인터넷 연결 확인
- 로컬 서버를 통해 실행 중인지 확인 (file:// 프로토콜은 제한될 수 있음)

### CORS 오류
**해결:**
- 로컬 웹 서버를 통해 실행 (Python http.server, VS Code Live Server 등)
- 파일을 직접 열지 말고 http://localhost를 통해 접근

### GitHub Pages 404 오류
**해결:**
- 저장소 설정에서 GitHub Pages가 올바르게 활성화되었는지 확인
- index.html 파일이 루트 디렉토리에 있는지 확인
- 대소문자 구분 확인 (파일명, 경로)

## 🌟 주요 특징

### ✅ 상용화 가능 수준
- 안정적인 에러 핸들링
- 로딩 상태 표시
- 사용자 친화적 메시지
- 반응형 디자인

### ✅ 직관적인 UI
- 한 눈에 보이는 정보
- 3단 대시보드 레이아웃
- 스마트 스크롤
- 시각적 피드백

### ✅ 실시간 연동
- Google Maps 최신 데이터
- 실시간 대중교통 정보
- 즉각적인 검색 결과

### ✅ 개인화
- 사용자 취향 반영
- 예산별 추천
- 여행 스타일 맞춤

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 🤝 기여

이슈 및 풀 리퀘스트를 환영합니다!

## 📧 문의

프로젝트 관련 문의: GitHub Issues

---

**Made with ❤️ by TravelMate Team**

*"완벽한 여행의 시작, TravelMate Premium"*

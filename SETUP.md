# 🚀 빠른 시작 가이드

## 1단계: API 키 설정 (필수)

### Google Maps API 키 발급

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com/ 방문
   - Google 계정으로 로그인

2. **프로젝트 생성**
   - 새 프로젝트 만들기 클릭
   - 프로젝트 이름: "TravelMate" (또는 원하는 이름)

3. **API 활성화**
   - 좌측 메뉴: APIs & Services → Library
   - 다음 API 검색 후 "Enable" 클릭:
     - ✅ Maps JavaScript API
     - ✅ Places API
     - ✅ Directions API
     - ✅ Geocoding API

4. **API 키 생성**
   - APIs & Services → Credentials
   - "Create Credentials" → "API Key"
   - API 키 복사 (예: AIzaSyD...)

5. **환경 변수 파일 생성**
   ```bash
   # env.example.js를 env.js로 복사
   cp env.example.js env.js
   ```

6. **API 키 입력**
   - `env.js` 파일 열기
   - API 키 입력:
   ```javascript
   const ENV = {
       GOOGLE_MAPS_API_KEY: 'AIzaSyD...'  // 여기에 실제 API 키 붙여넣기
   };
   ```
   - 저장 (env.js는 .gitignore에 포함되어 Git에 커밋되지 않습니다)

## 2단계: 로컬 실행

### 방법 1: Python 웹 서버 (추천)

```bash
# Python 3가 설치되어 있다면
python -m http.server 8000

# 또는 Python 2
python -m SimpleHTTPServer 8000
```

브라우저에서 **http://localhost:8000** 열기

### 방법 2: VS Code Live Server

1. VS Code 설치
2. "Live Server" 확장 설치
3. `index.html` 우클릭 → "Open with Live Server"

### 방법 3: Node.js http-server

```bash
npx http-server -p 8000
```

## 3단계: GitHub Pages 배포

### ⚠️ 중요: API 키 보안

env.js 파일은 .gitignore에 포함되어 있어 Git에 커밋되지 않습니다.
**공개 저장소에서는 API 키가 노출될 수 있으므로 주의하세요!**

**방법 1: 프라이빗 저장소 사용 (권장)**
- 저장소를 private으로 설정하고 env.js 포함하여 푸시

**방법 2: 별도 브랜치 사용**
- gh-pages 브랜치 생성 후 env.js 포함하여 배포

### GitHub Pages 설정

1. **env.js를 임시로 .gitignore에서 제거** (배포용)
   ```bash
   # .gitignore 파일 편집하여 'env.js' 줄을 임시로 주석 처리
   # env.js
   ```

2. **저장소에 코드 푸시**
   ```bash
   git add .
   git commit -m "Add travel app with API key"
   git push origin main
   ```

3. **.gitignore 원복** (보안 강화)
   ```bash
   # .gitignore에서 주석 해제
   env.js

   git add .gitignore
   git commit -m "Restore gitignore"
   git push origin main
   ```

4. **GitHub Pages 활성화**
   - GitHub 저장소 → Settings
   - 좌측 메뉴 → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` / (root)
   - Save 클릭

5. **배포 확인**
   - 2-3분 후 `https://사용자명.github.io/저장소명` 접속
   - 녹색 체크마크 확인: Actions 탭

**더 안전한 방법:**
- GitHub Actions Secrets 사용 권장 (고급)
- 프라이빗 저장소 사용
- API 키에 HTTP Referrer 제한 설정

## 사용 방법

### 기본 사용

1. **출발지/도착지 입력**
   - 예: "서울역", "강남역", "부산역"

2. **날짜/시간 선택**
   - 출발 날짜와 시간 설정
   - 여행 기간 입력 (일 단위)

3. **취향 선택 (선택사항)**
   - 음식: 한식, 일식, 중식 등
   - 활동: 관광, 쇼핑, 자연 등
   - 예산: 절약형/보통/럭셔리
   - 속도: 여유롭게/보통/빠르게

4. **경로 검색**
   - "경로 검색" 버튼 클릭
   - 지도에서 경로 확인
   - 우측 패널에서 상세 정보 확인

### 결과 확인

- **지도**: 경로 및 추천 장소 마커
- **대중교통 경로**: 버스/지하철/기차 상세 정보
- **AI 추천**: 맛집, 관광지 등 개인화 추천

## 문제 해결

### API 키 오류
```
Google Maps API error: InvalidKeyMapError
```
→ index.html의 API 키 확인 및 API 활성화 확인

### 지도가 안 보임
→ 로컬 웹 서버를 통해 실행 (file:// 직접 열기 X)

### 경로 검색 실패
→ 더 구체적인 주소 입력 ("서울" → "서울역")

### GitHub Pages 404
→ index.html이 루트 디렉토리에 있는지 확인

## 프로젝트 구조

```
.
├── index.html          # 메인 HTML 파일
├── css/
│   └── style.css      # 스타일시트
├── js/
│   ├── config.js      # 설정 및 상태
│   ├── maps.js        # Google Maps API
│   ├── ui.js          # UI 렌더링
│   └── app.js         # 메인 로직
└── README.md          # 프로젝트 문서
```

## 다음 단계

- [ ] Google Maps API 키 발급 및 입력
- [ ] 로컬에서 테스트 실행
- [ ] GitHub Pages 배포
- [ ] 실제 여행 계획에 사용해보기!

## 지원

- 문제 발생시: GitHub Issues
- 문서: README.md 참고
- API 문서: https://developers.google.com/maps

---

**즐거운 여행 되세요! 🌍✈️**

# 🚀 빠른 실행 가이드

## ⚠️ 중요: 404 에러 방지

**절대 dist/index.html을 직접 브라우저에서 열지 마세요!**
파일을 직접 열면 `file://` 프로토콜로 실행되어 404 에러가 발생합니다.

반드시 아래 방법 중 하나로 실행하세요.

---

## 방법 1: 개발 서버 실행 (권장)

가장 쉽고 빠른 방법입니다.

### 1단계: 터미널 열기
프로젝트 폴더에서 터미널을 엽니다.

### 2단계: 개발 서버 실행
```bash
npm run dev
```

### 3단계: 브라우저 자동 실행
브라우저가 자동으로 열리고 `http://localhost:3000`으로 접속됩니다.

자동으로 열리지 않으면 브라우저에서 직접 접속:
```
http://localhost:3000
```

### 개발 서버 중지
터미널에서 `Ctrl + C` 누르기

---

## 방법 2: 프로덕션 빌드 실행

빌드된 최적화 버전을 실행합니다.

### 1단계: 빌드
```bash
npm run build
```

### 2단계: 미리보기 서버 실행
```bash
npm run preview
```

### 3단계: 브라우저 접속
```
http://localhost:4173
```

---

## 🔧 Google Maps API 키 설정

### 1단계: .env 파일 생성
프로젝트 루트에 `.env` 파일을 만듭니다:

```bash
cp .env.example .env
```

### 2단계: API 키 입력
`.env` 파일을 열어서 실제 API 키를 입력합니다:

```env
VITE_GOOGLE_MAPS_API_KEY=실제_API_키_여기에
```

### API 키 발급 방법
1. https://console.cloud.google.com/ 접속
2. 새 프로젝트 생성
3. **APIs & Services** → **Library**
4. 다음 API 활성화:
   - ✅ Maps JavaScript API
   - ✅ Places API
   - ✅ Directions API
   - ✅ Geocoding API
5. **Credentials** → **Create Credentials** → **API Key**
6. 생성된 키를 복사하여 `.env` 파일에 붙여넣기

---

## ❌ 흔한 실수

### 1. dist/index.html을 직접 열기
```
❌ file:///Users/.../dist/index.html  (에러 발생!)
✅ http://localhost:3000              (정상 작동)
```

### 2. npm install 안 하고 실행
```bash
# 먼저 의존성 설치 필요
npm install

# 그 다음 실행
npm run dev
```

### 3. 포트가 이미 사용 중
```bash
# 다른 포트로 실행
PORT=3001 npm run dev
```

---

## 📋 체크리스트

시작하기 전에 확인하세요:

- [ ] Node.js 18 이상 설치됨
- [ ] 프로젝트 폴더로 이동함
- [ ] `npm install` 실행함
- [ ] `.env` 파일 생성함
- [ ] Google Maps API 키 입력함
- [ ] `npm run dev` 실행함
- [ ] 브라우저에서 `http://localhost:3000` 접속

---

## 🆘 문제 해결

### "Cannot find module" 에러
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 is already in use"
```bash
# 터미널에서 Ctrl+C로 기존 서버 종료하거나
PORT=3001 npm run dev
```

### "Google Maps API key is invalid"
- .env 파일이 프로젝트 루트에 있는지 확인
- API 키가 올바른지 확인
- Google Cloud Console에서 필요한 API들이 활성화되었는지 확인

### 404 에러가 계속 나는 경우
```bash
# 캐시 클리어 및 재빌드
rm -rf dist node_modules/.vite
npm run dev
```

브라우저 캐시도 클리어:
- Chrome/Edge: `Ctrl + Shift + Delete`
- Firefox: `Ctrl + Shift + Delete`

---

## 📝 추가 명령어

### 개발 모드
```bash
npm run dev        # 개발 서버 실행
```

### 프로덕션
```bash
npm run build      # 프로덕션 빌드
npm run preview    # 빌드 결과 미리보기
```

### 클린 빌드
```bash
rm -rf dist
npm run build
```

---

## 💡 팁

1. **개발 중**: `npm run dev` 사용 (핫 리로드 지원)
2. **테스트**: `npm run preview` 사용 (최적화된 버전)
3. **배포**: `dist` 폴더를 웹 서버에 업로드

---

## ✅ 정상 실행 확인

개발 서버가 정상 실행되면 터미널에 다음과 같이 표시됩니다:

```
  VITE v7.2.1  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

이제 브라우저에서 `http://localhost:3000`으로 접속하면 앱이 실행됩니다!

---

**문제가 계속되면 이슈를 등록해주세요.**

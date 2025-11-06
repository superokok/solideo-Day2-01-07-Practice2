# TravelMate 실행 가이드

## 🚨 중요: 404 에러 해결 방법

404 에러가 발생하는 경우 다음 단계를 **순서대로** 실행하세요:

### 1단계: 환경 설정

Google Maps API 키를 설정해야 합니다:

```bash
# .env 파일 생성
cp .env.example .env

# .env 파일을 열어서 실제 API 키로 변경
# VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Google Maps API 키 발급 방법:**
1. https://console.cloud.google.com/ 접속
2. 새 프로젝트 생성
3. "APIs & Services" > "Library"로 이동
4. 다음 API들을 활성화:
   - Maps JavaScript API
   - Places API
   - Directions API
5. "APIs & Services" > "Credentials"로 이동
6. "Create Credentials" > "API Key" 클릭
7. 생성된 API 키를 복사하여 .env 파일에 붙여넣기

### 2단계: 의존성 설치

```bash
# node_modules 완전히 삭제 (문제 발생 시)
rm -rf node_modules package-lock.json

# 의존성 새로 설치
npm install
```

### 3단계: 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev
```

브라우저에서 **http://localhost:3000** 으로 접속하세요.

### 4단계: 브라우저 캐시 제거

개발 서버가 실행 중인데도 404 에러가 나면:

**Chrome/Edge:**
- `Ctrl + Shift + Delete` (Windows) 또는 `Cmd + Shift + Delete` (Mac)
- "캐시된 이미지 및 파일" 선택
- "데이터 삭제" 클릭
- 또는 `Ctrl + F5` (Windows) / `Cmd + Shift + R` (Mac)로 강력 새로고침

**Firefox:**
- `Ctrl + Shift + Delete` (Windows) 또는 `Cmd + Shift + Delete` (Mac)
- "캐시" 선택
- "지금 삭제" 클릭

## 프로덕션 빌드

프로덕션용 빌드를 생성하려면:

```bash
# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 문제 해결 체크리스트

- [ ] Node.js 버전 확인 (v18 이상 권장)
  ```bash
  node --version
  ```

- [ ] npm 캐시 클리어
  ```bash
  npm cache clean --force
  ```

- [ ] .env 파일이 프로젝트 루트에 존재하는지 확인
  ```bash
  ls -la | grep .env
  ```

- [ ] Google Maps API 키가 제대로 설정되었는지 확인
  ```bash
  cat .env
  ```

- [ ] 개발 서버가 포트 3000에서 실행 중인지 확인
  ```bash
  lsof -i :3000  # Mac/Linux
  netstat -ano | findstr :3000  # Windows
  ```

- [ ] 방화벽이 포트 3000을 차단하지 않는지 확인

## 대체 포트로 실행

포트 3000이 이미 사용 중이면:

```bash
# 다른 포트로 실행
PORT=3001 npm run dev
```

또는 `vite.config.ts` 파일을 수정:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,  // 원하는 포트로 변경
  },
})
```

## 정상 실행 확인

개발 서버가 정상적으로 실행되면 터미널에 다음과 같이 표시됩니다:

```
VITE v7.2.1  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

이제 브라우저에서 `http://localhost:3000`으로 접속하면 됩니다!

## 추가 도움

문제가 계속되면 다음 정보와 함께 이슈를 등록해주세요:
- Node.js 버전
- npm 버전
- 운영체제
- 에러 메시지 전체 내용
- 브라우저 개발자 도구의 Console 탭 에러

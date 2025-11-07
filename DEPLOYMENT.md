# 🚀 GitHub Pages 배포 가이드

## 📋 배포 전 체크리스트

### 1. GitHub Repository 설정

#### Settings → Pages 설정
1. GitHub 저장소로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - Source: `GitHub Actions` 선택 ✅

### 2. Google Maps API 키 설정 (중요!)

#### GitHub Secrets 등록
1. 저장소의 **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. 다음 정보 입력:
   - Name: `VITE_GOOGLE_MAPS_API_KEY`
   - Secret: `실제_Google_Maps_API_키`
4. **Add secret** 클릭

⚠️ **중요**: Secret 이름이 정확히 `VITE_GOOGLE_MAPS_API_KEY`여야 합니다!

---

## 🔧 자동 배포 설정 완료

이 프로젝트는 이미 GitHub Actions 워크플로우가 설정되어 있습니다.

### 자동 배포 트리거
다음 브랜치에 push하면 자동으로 배포됩니다:
- `claude/travel-personalization-app-011CUrMPKU5SsW9Yc94N45kb`

### 배포 파일 위치
```
.github/workflows/deploy.yml  ← GitHub Actions 워크플로우
```

---

## 📦 수동 배포 (필요시)

### 방법 1: GitHub Actions에서 수동 실행
1. 저장소의 **Actions** 탭 클릭
2. 왼쪽에서 **Deploy to GitHub Pages** 워크플로우 선택
3. **Run workflow** 버튼 클릭
4. 브랜치 선택 후 **Run workflow** 실행

### 방법 2: 로컬에서 배포
```bash
# 1. 빌드
npm run build

# 2. dist 폴더를 gh-pages 브랜치로 push (수동)
# (GitHub Actions 사용을 권장하므로 이 방법은 비추천)
```

---

## 🌐 배포 URL

배포가 완료되면 다음 URL로 접속 가능합니다:

```
https://superokok.github.io/solideo-Day2-01-07-Practice2/
```

---

## ✅ 배포 확인 방법

### 1. GitHub Actions 확인
1. 저장소의 **Actions** 탭
2. 최근 워크플로우 실행 확인
3. 모든 단계가 ✅ 녹색 체크마크인지 확인

### 2. Pages 배포 상태 확인
1. **Settings** → **Pages**
2. 상단에 다음과 같은 메시지 확인:
   ```
   ✅ Your site is live at https://superokok.github.io/solideo-Day2-01-07-Practice2/
   ```

### 3. 실제 사이트 접속
브라우저에서 배포 URL 접속하여 정상 작동 확인

---

## 🔍 배포 실패 시 해결 방법

### 1. GitHub Actions 로그 확인
```
Actions 탭 → 실패한 워크플로우 클릭 → 에러 메시지 확인
```

### 2. 흔한 문제와 해결법

#### ❌ 404 Not Found
**원인**: base 경로가 잘못 설정됨
**해결**:
- `vite.config.ts`에서 base 경로 확인
- 저장소 이름이 `/solideo-Day2-01-07-Practice2/`와 일치하는지 확인

#### ❌ Blank White Screen
**원인**: JavaScript 파일을 찾지 못함
**해결**:
```bash
# 로컬에서 테스트
GITHUB_ACTIONS=true npm run build
npm run preview
```

#### ❌ Build Failed
**원인**: TypeScript 에러 또는 의존성 문제
**해결**:
```bash
# 로컬에서 빌드 테스트
npm install
npm run build
```

#### ❌ API Key Error
**원인**: Google Maps API 키가 설정되지 않음
**해결**:
1. Settings → Secrets and variables → Actions
2. `VITE_GOOGLE_MAPS_API_KEY` secret 확인
3. 키가 유효한지 Google Cloud Console에서 확인

---

## 🔄 배포 프로세스

### 자동 배포 흐름
```
1. 코드 push
   ↓
2. GitHub Actions 트리거
   ↓
3. Node.js 환경 설정
   ↓
4. 의존성 설치 (npm ci)
   ↓
5. 빌드 (npm run build)
   ↓
6. dist 폴더를 GitHub Pages에 업로드
   ↓
7. 배포 완료 ✅
```

### 예상 배포 시간
- **빌드**: 약 1-2분
- **배포**: 약 30초-1분
- **전체**: 약 2-3분

---

## 📝 설정 파일 설명

### `.github/workflows/deploy.yml`
GitHub Actions 워크플로우 파일
- Node.js 20 사용
- npm ci로 의존성 설치
- Vite 빌드 실행
- GitHub Pages에 자동 배포

### `vite.config.ts`
```typescript
const base = process.env.GITHUB_ACTIONS
  ? '/solideo-Day2-01-07-Practice2/'  // GitHub Pages
  : './'                              // 로컬
```

### `public/404.html`
SPA 라우팅을 위한 404 페이지 (자동 리다이렉트)

### `public/.nojekyll`
GitHub Pages에서 Jekyll 빌드 비활성화

---

## 🎯 배포 후 확인사항

### 1. 기능 테스트
- [ ] 페이지가 정상적으로 로드됨
- [ ] 지도가 표시됨 (API 키 필요)
- [ ] 경로 검색이 작동함
- [ ] 추천 기능이 작동함
- [ ] 반응형 디자인이 정상 작동함

### 2. 콘솔 에러 확인
브라우저 개발자 도구 (F12) → Console 탭
- 404 에러가 없어야 함
- JavaScript 에러가 없어야 함

### 3. 네트워크 확인
개발자 도구 → Network 탭
- 모든 리소스가 200 상태로 로드되어야 함

---

## 🔐 보안 고려사항

### API 키 관리
- ✅ GitHub Secrets에 저장 (안전)
- ❌ 코드에 직접 입력 (위험)
- ✅ 환경 변수로만 사용

### API 키 제한
Google Cloud Console에서 API 키 제한 설정:
1. HTTP 리퍼러 제한:
   ```
   https://superokok.github.io/solideo-Day2-01-07-Practice2/*
   ```
2. API 제한: 필요한 API만 활성화

---

## 💡 팁

### 빠른 재배포
```bash
git add .
git commit -m "Update: 변경사항 설명"
git push
# 자동으로 배포 시작됨 🚀
```

### 로컬에서 프로덕션 빌드 테스트
```bash
# GitHub Actions 환경 변수 설정
GITHUB_ACTIONS=true npm run build

# 빌드 결과 확인
npm run preview
```

### 배포 상태 모니터링
- GitHub 모바일 앱으로 Actions 알림 받기
- 이메일 알림 설정 (Settings → Notifications)

---

## 📞 문제 해결 지원

### 로그 확인 위치
1. **GitHub Actions 로그**: Actions 탭 → 워크플로우 실행
2. **브라우저 콘솔**: F12 → Console 탭
3. **네트워크 에러**: F12 → Network 탭

### 일반적인 체크리스트
- [ ] GitHub Actions가 성공적으로 완료됨
- [ ] Settings → Pages에서 사이트가 활성화됨
- [ ] API Key Secret이 올바르게 설정됨
- [ ] base 경로가 저장소 이름과 일치함
- [ ] 브라우저 캐시를 클리어함 (Ctrl+Shift+Delete)

---

## 🎉 성공!

배포가 완료되면 전 세계 어디서나 접속 가능한 웹 애플리케이션이 됩니다!

**배포 URL**: `https://superokok.github.io/solideo-Day2-01-07-Practice2/`

---

**문서 업데이트**: 2025-01-06

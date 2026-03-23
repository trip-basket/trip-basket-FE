# Travel Basket

실시간 협업 여행 계획 캘린더 서비스

## 명령어

```bash
pnpm dev          # 개발 서버
pnpm build        # 프로덕션 빌드
pnpm biome check  # 린트 + 포맷 검사
pnpm biome check --write  # 린트 + 포맷 자동 수정
```

## 기술 스택

- Next.js 16 (App Router) + React 19 + TypeScript 5 (strict)
- Zustand 5 (상태 관리), TailwindCSS 4 (스타일링)
- tailwind-variants (컴포넌트 variant 관리)
- Google Maps API (@vis.gl/react-google-maps)
- Radix UI (Dialog, VisuallyHidden 등 headless UI)
- Biome (린터/포매터), pnpm (패키지 매니저)

## 프로젝트 구조

```
app/                          # Next.js App Router (페이지, 레이아웃)
  plan/[roomId]/              # 협업 방 (동적 라우트)
  dashboard/                  # 대시보드 (여행 목록)
  styles/                     # 글로벌 CSS, 디자인 토큰
src/
  lib/api/                    # API 클라이언트 + 도메인별 API 모듈
  components/ui/              # 공용 UI 컴포넌트 (button, input, text, avatar, modal)
  feature/
    calendar/                 # 캘린더 기능 (블록 드래그/리사이즈)
    maps/                     # Google Maps 연동 (장소 검색)
    room/                     # 레이아웃 (데스크톱/모바일 분기)
    landing/                  # 랜딩 페이지 컴포넌트
    dashboard/                # 대시보드 컴포넌트
SPEC/                         # 기능 명세 문서
```

### feature 디렉토리 규칙

각 feature는 아래 구조를 따른다:

```
feature/<name>/
  components/     # 컴포넌트
  hooks/          # 커스텀 훅
  stores/         # Zustand 스토어
  types/          # 타입 정의
  constants/      # 상수
  utils/          # 유틸리티
  mocks/          # 목 데이터
  index.ts(x)     # barrel export
```

## 디자인 시스템

### UI 컴포넌트 (`src/components/ui/`)

**공용 컴포넌트가 커버하는 영역에서는 반드시 사용한다. raw HTML 태그(`<span>`, `<p>`, `<h1>`~`<h4>`, `<button>`, `<input>`)를 직접 쓰지 않는다.** 상세 규칙은 `src/components/ui/CLAUDE.md` 참조.

- `Button` — variant(`solid`, `outline`, `ghost`, `link`, `icon`), color(`primary`, `danger`, `neutral`), size(`sm`, `md`, `lg`). tailwind-variants 기반.
- `Input` — 텍스트 입력 필드
- `Text` — 텍스트 타이포그래피
- `Avatar` — 사용자 아바타
- `Modal` / `BottomSheet` — Zustand 기반 모달 시스템

### 디자인 토큰 (3-layer)

```
app/styles/design-tokens.css   → 원시 값 (색상 hex, spacing px)
app/styles/semantic-tokens.css → 의미 부여 + 다크모드 (bg-primary, text-accent 등)
app/styles/theme.css           → Tailwind 연결 (@theme inline)
```

## API 요청

- **`api` 헬퍼를 사용한다.** `apiClient`를 직접 쓰지 않는다 (응답 헤더 등 전체 응답이 필요한 경우만 예외).
- API 파일은 `src/lib/api/` 에 도메인별로 분리한다.

```
src/lib/api/
  api-client.ts   # axios 인스턴스 + interceptor + api 헬퍼
  room.ts         # 방(room) 관련 API
  index.ts        # barrel export
```

사용 예시:

```typescript
import { roomApi } from "@/src/lib/api";

const room = await roomApi.create({ title: "도쿄 여행" });
```

## 상태 관리

- **Zustand 5** — feature별 스토어 (`feature/<name>/stores/`)
- 캘린더: `use-calendar-store.ts` (블록, 날짜, 선택 상태)
- 모달: `src/components/ui/modal/modal-store.ts` (전역 모달 상태)

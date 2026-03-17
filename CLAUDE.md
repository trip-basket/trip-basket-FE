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

**새로운 UI를 만들기 전에 반드시 기존 공용 컴포넌트를 확인하고, 사용 가능하면 사용한다.**

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

## 상태 관리

- **Zustand 5** — feature별 스토어 (`feature/<name>/stores/`)
- 캘린더: `use-calendar-store.ts` (블록, 날짜, 선택 상태)
- 모달: `src/components/ui/modal/modal-store.ts` (전역 모달 상태)

# Travel Basket

실시간 협업 여행 계획 캘린더 앱. **공부 목적**도 겸하는 프로젝트.

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
- Google Maps API (@vis.gl/react-google-maps)
- Biome (린터/포매터), pnpm (패키지 매니저)

## 프로젝트 구조

```
app/                          # Next.js App Router (페이지, 레이아웃)
  plan/[roomId]/              # 협업 방 (동적 라우트)
  styles/                     # 글로벌 CSS, 디자인 토큰
src/
  components/ui/              # 공용 UI 컴포넌트 (button, input, text, modal)
  feature/
    calendar/                 # 캘린더 기능 (블록 드래그/리사이즈)
    maps/                     # Google Maps 연동 (장소 검색)
    room/                     # 레이아웃 (데스크톱/모바일 분기)
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

## 코드 컨벤션

- **Biome 규칙 준수** — `biome check` 통과 필수
- 타입 import는 `import type` 사용
- 배열 타입은 shorthand (`string[]`, not `Array<string>`)
- block statement 필수 (한 줄 if도 중괄호)
- `any` 사용 지양, `===` 사용 (no double equals)
- 배열 index를 key로 사용 금지
- 네이밍: strictCase (camelCase 변수, PascalCase 컴포넌트/타입)
- 경로 별칭: `@/*` (루트), `@/src/*` (src)

## 학습 노트

기능 개발 중 공부할 만한 주제가 나오면 `docs/learning/` 디렉토리에 마크다운으로 정리한다.

### 작성 기준

- 기능 개발 중 새로 알게 된 개념이나 깊이 파볼 가치가 있는 주제
- 삽질했거나 헷갈렸던 부분
- 라이브러리/API의 동작 원리

### 작성 형식

```markdown
# [주제]

## 배경
> 어떤 기능을 개발하다가, 어떤 상황에서 이 주제를 만났는지

## 핵심 내용
> 구체적인 설명 (코드 예시 포함)

## 참고
> 공식 문서, 아티클 링크 등
```

### 예시 상황

- 캘린더 블록 드래그 구현 중 → `pointer-events`와 `requestAnimationFrame` 학습
- Zustand 스토어 설계 중 → 불변성 업데이트 패턴, selector 최적화 학습
- Google Maps API 연동 중 → Places API 동작 방식 학습

# Design System: Travel Basket

## 1. Visual Theme & Atmosphere

Travel Basket은 **청춘 배낭여행의 설렘을 디지털로 옮긴** 서비스다. 친구들과 둘러앉아 지도를 펼치고, 가고 싶은 곳을 오려 붙이고, 동선을 점선으로 이어가는 — 그 아날로그적 여행 계획의 즐거움을 웹에서 재현한다.

디자인의 핵심 모티프는 **여행 플래너 노트**다. 점선으로 경로를 잇고, 사진을 붙이고, 스티커처럼 일정 블록을 배치하는 감각. 차갑고 효율적인 SaaS 캘린더가 아니라, 손으로 만지는 듯한 촉감과 따뜻함이 있는 인터페이스를 지향한다. 격자 배경은 사용하지 않는다 — 점선 모티프와 겹치면 시각적 노이즈가 된다.

**두 가지 톤의 연속체:**
- **랜딩 (구경하는 페이지):** 여행 스크랩북 — 기울어진 사진 카드, 비행 경로 점선, 넓은 여백, 감성적 타이포그래피
- **Plan (작업하는 페이지):** 여행 플래너 노트 — 점선과 컬러 블록, 정돈된 시간축, 기능적이되 따뜻한 UI

이 둘은 같은 세계관 안에 있다. 랜딩의 점선 경로는 plan의 그리드라인으로, 랜딩의 사진 카드는 plan의 일정 블록으로 자연스럽게 변환된다.

**Key Characteristics:**
- 따뜻한 near-black (`#222222`) 텍스트 — 순수 검정 대신
- Warm white 배경 (`#FAFAF8`) — 순백보다 크림에 가까운 노트 느낌
- **옐로우 + 블랙 + 화이트** 브랜드 트라이어드 — 블랙이 주인공, 옐로우는 포인트 강조에만
- **점선(dashed)이 핵심 시각 언어**: 카드 테두리, 경로, 공유 영역, 빈 슬롯 — 스크랩북의 "스티칭" 느낌. 점선은 이 앱의 가장 강한 시각적 특징이다.
- 사진/이미지는 점선 컨테이너 안에 패딩과 함께 배치 — 노트에 사진을 끼워넣은 느낌
- 넉넉한 border-radius: 8px 버튼, 16px 카드, 20px+ 이미지 컨테이너
- 3-layer 그림자 시스템으로 자연스러운 깊이감
- 빈 슬롯/placeholder는 점선 테두리 + "+" 아이콘 — 콘텐츠를 넣으라는 초대

## 2. Color Palette & Roles

### Brand Triad: Yellow + Black + White

블랙이 주인공이고, 옐로우는 포인트 강조에만 사용한다. 아이폰 기본 앱의 깔끔한 느낌을 차용하되, 여행의 따뜻함과 에너지를 옐로우로 표현한다.

**Black (Primary)**
- **Near Black** (`#222222`): 기본 CTA 버튼, 주요 텍스트, 아이콘. 모든 UI의 주인공.
- **Soft Black** (`#333333`): hover 텍스트, 보조 강조

**Yellow (Accent Point)**
- **Basket Yellow** (`#FBBF24`): 브랜드 포인트 컬러. 아이콘 fill, 점선 경로, 뱃지, 강조 밑줄, 활성 상태 indicator에 사용. **절대 배경색이나 버튼 배경으로 쓰지 않는다.**
- **Dark Amber** (`#92400E`): 옐로우 계열 텍스트가 필요할 때 (화이트 위에서 접근성 확보). 뱃지 텍스트, 가격 태그 등.
- **Soft Yellow** (`#FEF9C3`): 연한 옐로우 틴트. 선택 상태 배경, 활성 탭 배경, 알림 배경 등 미세한 하이라이트.
- **Yellow Border** (`#FDE68A`): 옐로우 계열 테두리. 포커스 링, 선택 상태 테두리.

**White (Canvas)**
- Pure White (`#FFFFFF`)와 Warm White (`#FAFAF8`)는 Surface & Background 섹션 참조.

### Surface & Background
- **Warm White** (`#FAFAF8`): 메인 배경 — 순백이 아닌 미세한 크림 톤. 노트/종이 느낌.
- **Pure White** (`#FFFFFF`): 카드, 모달, 플로팅 요소의 표면
- **Warm Inset** (`#F5F5F3`): 인셋 배경, 입력 필드, 비활성 영역
- **Cream Tint** (`#F0EDE8`): 섹션 구분, 사이드바 배경

### Text Scale
- **Near Black** (`#222222`): 주요 텍스트 — 따뜻하고 부드러운 검정
- **Dark Gray** (`#4A4A4A`): 보조 텍스트, 설명
- **Medium Gray** (`#6B7280`): 연한 텍스트, 플레이스홀더
- **Light Gray** (`#9CA3AF`): 비활성 텍스트, 힌트
- **Inverse** (`#FFFFFF`): 어두운 배경 위 텍스트

### Border & Divider
- **Soft Border** (`#E8E5E0`): 주요 테두리 — 순수 회색이 아닌 따뜻한 톤
- **Medium Border** (`#D4D0C8`): 강조 테두리, 구분선
- **Accent Border** (`#FDE68A`): 옐로우 액센트 테두리 (선택/포커스)

### Calendar Block Colors
카테고리별 블록 색상. 각 색상은 3단계(base/tint/accent) 체계를 따른다:
- **base**: 블록 배경 (연한)
- **tint**: 호버/인터랙티브 상태 (중간)
- **accent**: 텍스트, 아이콘, 좌측 바 (진한)

| Category | Base | Tint | Accent |
|----------|------|------|--------|
| Sky (관광) | `#E0F2FE` | `#BAE6FD` | `#0284C7` |
| Orange (식사) | `#FFEDD5` | `#FED7AA` | `#EA580C` |
| Rose (쇼핑) | `#FFE4E6` | `#FECDD3` | `#E11D48` |
| Teal (이동) | `#CCFBF1` | `#99F6E4` | `#0D9488` |
| Violet (숙소) | `#EDE9FE` | `#DDD6FE` | `#7C3AED` |
| Indigo (체험) | `#E0E7FF` | `#C7D2FE` | `#4F46E5` |
| Fuchsia (기타) | `#FAE8FF` | `#F5D0FE` | `#C026D3` |
| Slate (미정) | `#F1F5F9` | `#CBD5E1` | `#475569` |

### Semantic
- **Error** (`#DC2626`): 오류, 삭제 확인
- **Success** (`#16A34A`): 성공, 완료 상태
- **Warning** (`#CA8A04`): 경고, 주의

### Collaboration
- **Shared Indicator** (`#E8E5E0`): 공유 영역 테두리 — 배경과 조화되는 따뜻한 회색, 눈에 띄되 시선을 빼앗지 않음

## 3. Typography Rules

### Font Family
- **Primary**: `NanumSquareRound`, system-ui, sans-serif
- 둥근 터미널의 한글 서체 — 딱딱하지 않은 여행 느낌과 일치
- Weights: 300 (Light), 400 (Regular), 700 (Bold), 800 (ExtraBold)

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Use |
|------|------|--------|-------------|----------------|-----|
| Display | 42px (2.625rem) | 800 | 1.2 | -0.5px | 랜딩 히어로 타이틀 |
| H1 | 34px (2.125rem) | 700 | 1.2 | -0.3px | 페이지 제목 |
| H2 | 26px (1.625rem) | 700 | 1.3 | -0.2px | 섹션 제목 |
| H3 | 22px (1.375rem) | 700 | 1.3 | normal | 카드/패널 제목 |
| H4 | 20px (1.25rem) | 600 | 1.4 | normal | 서브 제목 |
| Body | 17px (1.0625rem) | 400 | 1.6 | normal | 본문 텍스트 |
| Body Medium | 17px (1.0625rem) | 600 | 1.6 | normal | 강조 본문 |
| Small | 15px (0.9375rem) | 400 | 1.5 | normal | 보조 텍스트, 캡션 |
| Caption | 13px (0.8125rem) | 400 | 1.4 | normal | 메타 정보, 타임스탬프 |
| Micro | 11px (0.6875rem) | 700 | 1.2 | 0.3px | 뱃지, 태그 (uppercase 가능) |

### Principles
- **Weight 대비로 위계 형성**: 같은 사이즈에서 400 vs 700의 차이로 시각적 강약 조절. 사이즈만으로 위계를 만들지 않는다.
- **Heading은 항상 700 이상**: 600은 서브 타이틀에만. 제목이 가볍게 보이면 위계가 무너진다.
- **Negative tracking on large text**: Display/H1에 -0.3~-0.5px letter-spacing으로 응집력 있는 제목.
- **본문 line-height 1.6**: 한글은 영문보다 자간/행간이 넉넉해야 읽기 편하다.

## 4. Component Stylings

### Buttons

**Primary (Solid)**
- Background: `#222222` (Near Black) — 모든 주요 행동의 기본 CTA
- Text: `#FFFFFF`
- Padding: 0 24px, Height: 44px
- Radius: 8px
- Hover: `#333333` (Soft Black)
- Transition: background 200ms ease

**Secondary (Outline)**
- Background: transparent
- Border: 1.5px solid `#E8E5E0` (Soft Border)
- Text: `#222222`
- Hover: background `#F5F5F3`, border `#D4D0C8`

**Ghost**
- Background: transparent
- Text: `#4A4A4A`
- Hover: background `#F5F5F3`

**Text Button (브랜드 액션)**
- Background: 없음
- Text: `#92400E` (Dark Amber) + 하단에 `#FBBF24` 밑줄 또는 아이콘
- Hover: text `#222222`
- **옐로우 배경 버튼은 만들지 않는다** — 접근성 이슈. 텍스트 기반 버튼으로 대체.

### Cards

**일정 블록 (Calendar Block)**
- Background: category base color
- Border-left: 3px solid category accent color
- Radius: 12px
- Shadow: `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` — glow 대신 자연스러운 그림자
- Hover: shadow `0 4px 12px rgba(0,0,0,0.08)`
- Dragging: shadow `0 8px 24px rgba(0,0,0,0.15)`, slight scale(1.02)

**장소 카드 (Place Card) — 스크랩북 포켓 스타일**
- Background: `#FFFFFF`
- Border: 1.5px dashed `#D4D0C8` — 실선이 아닌 점선. 스크랩북에 사진을 끼워넣은 "스티칭" 느낌.
- Radius: 20px (넉넉하게)
- Shadow: `0 1px 3px rgba(0,0,0,0.04)`
- 내부 패딩: 8px — 점선 테두리와 이미지 사이 여백. 노트에 사진 붙인 느낌.
- 이미지: radius 14px, 컨테이너를 꽉 채움 (패딩 안에서)
- Hover: shadow `0 4px 12px rgba(0,0,0,0.08)`

**빈 슬롯 (Empty Placeholder)**
- Background: transparent 또는 `#FAFAF8`
- Border: 1.5px dashed `#D4D0C8`
- Radius: 20px
- 중앙에 "+" 아이콘 (`#9CA3AF`)
- Hover: border `#FDE68A` (Yellow Border), "+" 아이콘 `#FBBF24`로 전환
- "여기에 추가하세요"라는 시각적 초대

**컨테이너 카드 (Panel/Section)**
- Background: `#FFFFFF`
- Radius: 16px
- Shadow: 3-layer 스타일
  - Layer 1: `0 0 0 1px rgba(0,0,0,0.03)` (미세 테두리)
  - Layer 2: `0 2px 6px rgba(0,0,0,0.04)` (앰비언트)
  - Layer 3: `0 4px 12px rgba(0,0,0,0.06)` (주요 리프트)

### Inputs
- Background: `#F5F5F3` (Warm Inset)
- Border: 1.5px solid transparent
- Focus: border `#FDE68A` (Yellow Border), background `#FFFFFF`
- Radius: 8px
- Text: `#222222`
- Placeholder: `#9CA3AF`

### Shared Area Indicator (공유 영역)
공유 영역은 **캘린더 그리드 + 버킷**을 하나의 패널로 감싸는 구조다. 이 패널 전체가 공유 대상임을 표시한다.

- Border: 1.5px dashed `#D4D0C8` (Medium Border) — 애니메이션 없이 정적 점선
- Radius: 12px
- 점선의 dash 패턴: `8 6` (현재 `10 5`보다 약간 넉넉한 간격)
- **No animation** — 정적이되 점선 자체가 "공유/협업"의 시각적 언어로 기능

### Bucket (장소 바구니)
버킷은 캘린더 패널 **내부 하단**에 위치한다. 캘린더 그리드와 동일한 흰색 패널 안에 있으므로, **배경 톤 차이**로 영역을 구분해야 한다.

- **배경**: `#F5F5F3` (Warm Inset) — 접힌 상태/펼친 상태 모두 동일. 캘린더 그리드(`#FFFFFF`)와 톤 차이로 "다른 영역"임을 시각적으로 전달
- **상단 구분선**: 1px solid `#E8E5E0` — 캘린더 그리드와의 경계
- **접힌 상태**: 타이틀 바(44px)만 노출. `#F5F5F3` 배경이 캘린더 하단에 띠처럼 깔림
- **펼친 상태**: 동일한 `#F5F5F3` 배경이 확장. 내부 블록 아이템은 `#FFFFFF` 카드로 올려서 이중 톤 구분
- 접힘/펼침 전환: 250ms cubic-bezier(0.165, 0.84, 0.44, 1)

**시각적 레이어 구조:**
```
Page Background (#FAFAF8 Warm White)
  └─ Shared Panel (#FFFFFF + dashed border)
       ├─ Calendar Grid (#FFFFFF) — 블록들이 위에 놓임
       └─ Bucket (#F5F5F3 Warm Inset) — 톤 차이로 구분
            └─ Bucket Items (#FFFFFF cards) — inset 위에 카드로 떠있음
```

### Navigation
- 헤더 배경: `#FFFFFF` (plan 페이지에서는 투명 → 스크롤 시 white)
- 하단 구분선: 1px `#E8E5E0`

## 5. Layout Principles

### Spacing System
- Base unit: 4px
- Scale: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
- **컴포넌트 내부 간격**: 8–16px
- **컴포넌트 간 간격**: 16–24px
- **섹션 간 간격**: 32–64px

### Grid & Container
- 랜딩: 최대 너비 1200px, 가운데 정렬
- Plan: 캘린더 50–65% + 지도 나머지 (리사이즈 가능)
- 캘린더 그리드: 7열 (요일), 시간축 좌측 고정

### Whitespace Philosophy
- **여행 매거진 호흡**: 랜딩에서는 넉넉한 수직 여백으로 천천히 스크롤하는 경험
- **작업 효율**: Plan 페이지에서는 정보 밀도를 높이되, 블록 간 최소 4px gap 보장
- **비대칭 여백**: 제목 위 여백 > 아래 여백 (콘텐츠와의 시각적 연결)

### Border Radius Scale
| Token | Value | Use |
|-------|-------|-----|
| sm | 4px | 태그, 뱃지, 작은 인터랙티브 요소 |
| md | 8px | 버튼, 입력 필드, 칩 |
| lg | 12px | 캘린더 블록, 드롭다운 |
| xl | 16px | 패널, 작은 카드, CTA 버튼 |
| 2xl | 20px | 장소 카드, 이미지 컨테이너 |
| 3xl | 24px | 대형 컨테이너, 모달 |
| full | 9999px | 아바타, 원형 버튼, 필 태그 |

## 6. Depth & Elevation

| Level | Shadow | Use |
|-------|--------|-----|
| Flat (0) | none | 배경, 인라인 텍스트 |
| Subtle (1) | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | 캘린더 블록, 리스트 아이템 |
| Card (2) | `0 0 0 1px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)` | 카드, 패널, 검색바 |
| Elevated (3) | `0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)` | 모달, 드롭다운, 플로팅 버킷 |
| Dragging (4) | `0 8px 24px rgba(0,0,0,0.15)` | 드래그 중인 블록 |

**Shadow Philosophy**: 그림자는 따뜻하고 자연스러운 빛을 모방한다. 이전의 accent 컬러 glow 대신, 중립적인 검정 기반 그림자를 단계적으로 사용해 깊이를 표현한다. Glow 효과는 시선을 빼앗으므로 제거하고, 순수한 elevation으로 위계를 만든다.

## 7. Do's and Don'ts

### Do
1. **near-black (`#222222`)을 텍스트와 기본 CTA에 사용한다** — 블랙이 UI의 주인공이다.
2. **Warm White (`#FAFAF8`)를 배경에 사용한다** — 순백(`#FFFFFF`)은 카드/플로팅 요소에만.
3. **Basket Yellow (`#FBBF24`)는 포인트 강조에만 사용한다** — 아이콘 fill, 점선 경로, 뱃지, 활성 indicator. 넓은 면적에 쓰면 눈이 피로해진다.
4. **옐로우 텍스트는 Dark Amber (`#92400E`)를 사용한다** — `#FBBF24`는 화이트 위에서 읽을 수 없다. 접근성 필수.
5. **점선(dashed)을 핵심 시각 언어로 적극 사용한다** — 카드 테두리, 비행 경로, 공유 영역, 빈 슬롯, 구분선. 실선보다 점선이 기본이다. 스크랩북의 "스티칭" 느낌.
6. **이미지는 점선 컨테이너 안에 패딩과 함께 배치한다** — 노트에 사진을 끼워넣은 느낌. 이미지 자체에 별도 테두리는 불필요.
7. **weight 대비로 위계를 만든다** — 같은 사이즈에서 400 vs 700 차이.
8. **3-layer 그림자를 카드에 사용한다** — 미세 테두리 + 앰비언트 + 리프트.
9. **넉넉한 border-radius를 유지한다** — 8px 버튼, 12px 블록, 20px 카드/이미지 컨테이너.
10. **블록 좌측에 accent color 바를 넣어 카테고리를 표시한다** — 배경색만으로는 구분이 약하다.
11. **접힌 버킷은 배경색 차이로 캘린더와 구분한다** — `#F5F5F3` vs `#FFFFFF`.
12. **빈 슬롯은 점선 + "+" 아이콘으로 표현한다** — 콘텐츠를 넣으라는 시각적 초대.

### Don't
1. **순수 검정(`#000000`)을 텍스트에 쓰지 않는다** — 항상 `#222222`.
2. **Basket Yellow (`#FBBF24`)를 버튼 배경이나 넓은 면적에 쓰지 않는다** — 포인트 강조(아이콘, 점선, 뱃지)에만.
3. **옐로우(`#FBBF24`)를 텍스트 컬러로 쓰지 않는다** — 화이트 위 대비 부족. 텍스트는 Dark Amber(`#92400E`).
4. **블록에 glow/color shadow를 쓰지 않는다** — 시선을 분산시킨다. 중립 그림자만 사용.
5. **공유 영역에 애니메이션 테두리를 쓰지 않는다** — 정적 점선이면 충분하다.
6. **sharp corner (0–2px radius)를 카드나 블록에 쓰지 않는다** — 최소 8px.
7. **font-weight 300을 UI에 쓰지 않는다** — 가독성이 떨어진다. 본문 최소 400, 제목 최소 600.
8. **회색 테두리에 순수 회색(`#E5E7EB` 등)을 쓰지 않는다** — 따뜻한 회색(`#E8E5E0`, `#D4D0C8`)을 사용.
9. **같은 사이즈의 텍스트를 같은 weight로 나열하지 않는다** — 위계 없는 텍스트는 시각적으로 "평평"해 보인다.
10. **순백 배경 위에 순백 카드를 놓지 않는다** — 배경은 Warm White, 카드는 Pure White로 톤 차이를 둔다.

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | < 640px | 1열 레이아웃, 캘린더 일별 보기, 지도 토글 |
| Tablet | 640–1024px | 캘린더 3일 보기, 지도 축소 |
| Desktop | 1024–1440px | 캘린더 7일 + 지도 분할 |
| Large | > 1440px | 최대 너비 제한, 여백 확대 |

### Collapsing Strategy
- **Desktop → Tablet**: 지도가 오른쪽에서 하단 또는 토글로 전환
- **Tablet → Mobile**: 캘린더 7일 → 3일 → 1일, 버킷은 하단 시트로
- **Typography**: Display 42px → 34px → 28px, Body는 고정

### Touch Targets
- 최소 44px 터치 영역
- 캘린더 블록: 모바일에서 tap으로 선택, long press로 드래그
- 버킷 아이템: 가로 스와이프 액션 (삭제, 수정)

## 9. Agent Prompt Guide

### Quick Color Reference
- Page background: Warm White (`#FAFAF8`)
- Card surface: Pure White (`#FFFFFF`)
- Inset/field bg: `#F5F5F3`
- Primary text: Near Black (`#222222`)
- Secondary text: `#4A4A4A`
- Brand accent (point): Basket Yellow (`#FBBF24`)
- Yellow text: Dark Amber (`#92400E`)
- Yellow tint bg: Soft Yellow (`#FEF9C3`)
- Yellow border: `#FDE68A`
- Primary border: `#E8E5E0`
- Shared area: dashed `#D4D0C8`

### Component Quick Reference
- **기본 CTA 버튼**: near-black(`#222222`) bg, white text, 8px radius, 44px height
- **텍스트 버튼 (브랜드)**: Dark Amber(`#92400E`) text + Basket Yellow 아이콘/밑줄. 배경 없음.
- **카드**: white bg, 16px radius, 3-layer shadow
- **캘린더 블록**: category base bg, 3px left accent bar, 12px radius
- **입력 필드**: warm inset bg, 8px radius, Yellow Border(`#FDE68A`) focus
- **공유 영역**: static dashed border `#D4D0C8`, 12px radius
- **활성 상태**: Soft Yellow(`#FEF9C3`) 배경 tint + Yellow Border

### Example Prompts
- "장소 카드를 만들어줘: 흰 배경, 16px radius, 3-layer 카드 그림자. 상단에 이미지(12px radius, 2px 흰 테두리), 하단에 장소명(17px bold #222222), 설명(15px #4A4A4A)."
- "캘린더 블록: sky 카테고리. 배경 #E0F2FE, 좌측 3px #0284C7 바, 12px radius. 제목 15px bold #222222, 시간 13px #6B7280."
- "공유 영역 표시: 1.5px dashed #D4D0C8, 12px radius. 애니메이션 없음."
- "활성 탭: Soft Yellow(#FEF9C3) 배경, Yellow Border(#FDE68A) 하단 또는 테두리. 텍스트 #222222."

### Design Decision Checklist
1. 배경이 Warm White인가? (순백이면 카드와 구분 안 됨)
2. 텍스트 위계가 weight로 구분되는가? (사이즈만으로 하면 평평해짐)
3. 옐로우가 포인트에만 쓰이고 있는가? (넓은 면적에 쓰면 눈이 피로해짐)
4. 옐로우 텍스트가 `#FBBF24`가 아닌 `#92400E`인가? (접근성)
5. 그림자가 3-layer인가? (단일 shadow는 플랫해 보임)
6. 테두리가 따뜻한 회색인가? (순수 회색은 차갑게 느껴짐)
7. 블랙 CTA가 기본이고, 옐로우 배경 버튼은 없는가?

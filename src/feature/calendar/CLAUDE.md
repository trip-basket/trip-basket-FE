# Calendar Feature

여행 일정을 시간 그리드에 배치하는 캘린더 기능. Bucket(장소 목록)과 Grid(시간표)로 구성.

## 구조

```
calendar/
  components/
    bucket/          # 장소 목록 (드래그 출발점)
    grid/            # 시간 그리드 (드래그 목적지, 리사이즈)
    calendar-header, day-header, time-column  # 레이아웃 컴포넌트
  hooks/             # 공유 드래그 로직
  stores/            # Zustand 스토어 (단일)
  types/             # 타입 정의 (단일)
  constants/         # 그리드 설정값 (단일)
  utils/             # 블록 위치 계산, 시간 포맷
  mocks/             # 목 데이터
```

bucket과 grid는 같은 store, 타입, 훅을 공유하므로 하나의 feature로 유지한다.

## 데이터 흐름

```
Place (bucket) ──드래그──→ moveToCalendar ──→ CalendarBlock (grid)
CalendarBlock  ──드래그──→ moveInCalendar ──→ CalendarBlock (위치 변경)
CalendarBlock  ──드래그──→ moveToBucket   ──→ Place (bucket 복귀)
CalendarBlock  ──리사이즈→ resizeBlock    ──→ CalendarBlock (시간 변경)
```

## 핵심 타입

- `Place` — 장소 기본 정보 (id, title). Bucket에 표시
- `CalendarBlock extends Place` — 캘린더에 배치된 블록 (dayIndex, startHour, endHour 추가)
- `Day` — 날짜 정보 (dayOfWeek, date). `room/types`에 정의됨
- 시각은 숫자로 표현: 7 = 07:00, 9.5 = 09:30

## 드래그 아키텍처

```
useBlockDrag (공유 훅)
  ├─ useBucketDrag  → moveToCalendar (duration: DEFAULT_BLOCK_DURATION)
  └─ useGridBlockDrag → moveInCalendar (duration: block.endHour - block.startHour)
```

- `useBlockDrag`: Pointer Events 기반 드래그 로직. `onDrop` 콜백과 `duration`을 받음
- 드롭 시 `getDropPosition`으로 좌표 → (dayIndex, hour) 변환
- `grabOffsetY`로 블록 내 잡은 위치 보정 (블록 상단 기준으로 드롭)

## 검증 로직

좌표 → 시각 변환 및 클램핑은 `getDropPosition` (hooks/utils.ts)에서 처리한다. Store는 검증 없이 값을 저장만 한다.

`getDropPosition` 내부 함수:
- `getGridRectIfDroppable` — 마우스가 그리드 영역 안인지 판정
- `getDayIndex` — X 좌표 → 날짜 컬럼 인덱스
- `getHour` — Y 좌표 → 클램핑된 시각 (Math.round로 가까운 시각 경계에 스냅)

## 리사이즈

`useGridBlockResize` (components/grid/):
- 상단/하단 핸들로 블록 시간 조절
- 0.5시간 단위 스냅 (`snapToHalfHour`)
- 최소 duration: 0.5시간

## 상수

- `HOUR_HEIGHT = 72` (px, 1시간 높이)
- `DAY_COL_MIN_W = 180` (px, 날짜 컬럼 최소 너비)
- `HOURS = [7..24]` (그리드 시간 범위)
- `DEFAULT_BLOCK_DURATION = 1` (시간, 새 블록 기본 길이)

## TODO

- [ ] 높이가 긴 일정을 옮길 때 화면을 넘치는 문제 (hooks/utils.ts)
- [ ] 일정이 넘칠 때 클램핑?

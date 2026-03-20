# 블록 인터랙션

## 개요

캘린더에서 블록을 드래그로 이동하고, 가장자리를 드래그해서 리사이즈하는 인터랙션.

---

## 타입 정의

**파일**: `src/feature/calendar/types/block.ts`

```ts
interface BlockBase {
  id: string;
  place: Place;
  name: string;
  color: BlockColorName;
  cost?: number;
  memo?: string;
  addedBy?: string;
  addedAt?: string;
  lockedBy?: string;
  reactions?: Reaction[];
  todos?: BlockTodo[];
}

interface BucketBlock extends BlockBase {
  status: "bucket";
}

interface ScheduledBlock extends BlockBase {
  status: "scheduled";
  startHour: number;
  endHour: number;
}

type Block = BucketBlock | ScheduledBlock;
```

- `status` 필드로 bucket/scheduled 구분 (discriminated union)
- `startHour`/`endHour`를 소수로 표현하여 30분 스냅 지원 (0.5 단위)

---

## 상태 관리

**파일**: `src/feature/calendar/stores/use-calendar-store.ts`

```ts
interface CalendarStore {
  tripDays: TripDay[];
  bucketBlocks: BucketBlock[];
  gridRef: HTMLDivElement | null;
  selectedBlockId: string | null;
  isBucketDragging: boolean;
  moveToCalendar: (block: BucketBlock, date: string, startHour: number) => void;
  moveInCalendar: (blockId: string, date: string, startHour: number) => void;
  resizeBlock: (blockId: string, startHour: number, endHour: number) => void;
  findBlock: (blockId: string) => { block: ScheduledBlock; date: string } | null;
  addToBucket: (place: Place) => void;
  addToCalendar: (place: Place, date: string, startHour: number) => void;
}
```

---

## 드래그 이동

### 공용 드래그 훅

**파일**: `src/feature/calendar/hooks/use-block-drag.ts`

**동작**:
1. 블록 본체를 pointerdown → 드래그 추적 시작
2. pointermove → 이동 거리 5px 초과 시 isDragging = true, 블록을 `position: fixed`로 마우스 따라 이동
3. pointerup:
   - `hasDragged === false` (5px 미만) → **onClick 콜백** (블록 상세 패널)
   - `hasDragged === true` → **onDrop 콜백** (위치 이동)

### Grid 블록 드래그

**파일**: `src/feature/calendar/components/grid/use-grid-block-drag.ts`

- `onDrop` → `getDropPosition`으로 좌표를 date/startHour로 변환 → `moveInCalendar`
- `onClick` → `setSelectedBlockId(block.id)`
- 드래그 중: `position: fixed`, `cursor: grabbing`, 강한 shadow

### Bucket 블록 드래그

**파일**: `src/feature/calendar/components/bucket/use-bucket-drag.ts`

- `onDrop` → `getDropPosition`으로 좌표를 date/startHour로 변환 → `moveToCalendar`
- 드래그 시작 시 `isBucketDragging = true` 설정

---

## 블록 리사이즈

**파일**: `src/feature/calendar/components/grid/use-grid-block-resize.ts`

**동작**:
1. 블록 상단/하단에 6px 높이 리사이즈 핸들 (cursor: `ns-resize`)
2. pointerdown → 리사이즈 방향 기록 ("top" | "bottom")
3. pointermove → startHour 또는 endHour 실시간 변경
4. pointerup → 0.5시간 단위 스냅 후 `resizeBlock` 호출

**제약**:
- 최소 duration: 0.5 (30분)
- 0.5시간 단위 스냅

---

## 좌표 → 시간 변환

**파일**: `src/feature/calendar/hooks/utils.ts`

`getDropPosition(gridRef, clientX, clientY, grabOffsetY)`:
1. gridRef.getBoundingClientRect() 기준 상대 좌표 계산
2. grabOffsetY 보정 (블록 내 잡은 위치)
3. relativeX / DAY_COL_MIN_W → dayIndex → tripDays[dayIndex].date
4. relativeY / HOUR_HEIGHT + gridStartHour → hour (0.5 단위 스냅)
5. 클램핑: gridStartHour ≤ hour ≤ gridEndHour - duration

---

## 겹침(Overlap) 레이아웃

**파일**: `src/feature/calendar/utils/block.ts`

같은 시간대에 블록이 겹칠 때:
- `computeOverlapLayout()` → 각 블록에 `zIndex`와 `leftInset` 할당
- `leftInset = depth × 15px` (시각적 오프셋)

---

## 미구현 사항

- Calendar → Bucket 이동 (BlockDetailPanel "버킷으로 이동" 버튼 UI만 존재)
- 블록 삭제 (BlockDetailPanel "삭제" 버튼 UI만 존재)

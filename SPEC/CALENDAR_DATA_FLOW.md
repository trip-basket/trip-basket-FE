# Calendar 데이터 흐름

## Store 구조

### useRoomStore (room feature)

방 전체에서 공유하는 데이터. Calendar, Maps 등 여러 feature에서 읽기 전용으로 참조한다.

```
room: Room | null        ← 방 정보 (name, currency, budget, inviteCode)
members: Member[]        ← 참여자 목록 (id, nickname, profileImageUrl, role)
```

- `addedBy`, `lockedBy`, `reactions[].memberId` → `members`에서 ID로 조회

### useCalendarStore (calendar feature)

캘린더 블록의 배치와 상태를 관리한다.

```
tripDays: TripDay[]             ← 날짜별 블록 배열 (date, dayOfWeek, dateNum, blocks)
bucketBlocks: BucketBlock[]     ← 미배치 블록 (Bucket에 표시)
gridRef: HTMLDivElement | null  ← 시간 그리드 DOM 참조 (드래그 좌표 계산용)
selectedBlockId: string | null  ← 선택된 블록 → 상세 패널 표시
isBucketDragging: boolean       ← 버킷 블록 드래그 중 여부
```

- 블록은 `tripDays[].blocks` 안에 날짜별로 중첩 관리됨 (flat 배열 아님)
- `TripDay.date` 문자열로 날짜를 식별 (dayIndex가 아닌 date 기반)

---

## 타입 관계

```
Place (src/types)                BlockBase (calendar/types)
├─ placeId: string | null        ├─ id: string
├─ placeName: string | null      ├─ place: Place
├─ lat: number                   ├─ name: string          ← 사용자 수정 가능한 표시명
├─ lng: number                   ├─ color: BlockColorName ← 8색 (sky, indigo, violet, ...)
├─ category?: PlaceCategory      ├─ cost?: number
├─ formattedAddress?: string     ├─ memo?: string
├─ rating?: number               ├─ addedBy?: string      ← Member.id
├─ reviewCount?: number          ├─ addedAt?: string
├─ openingHours?: OpeningHour[]  ├─ lockedBy?: string     ← Member.id
├─ priceLevel?: number           ├─ reactions?: Reaction[]
└─ photoUrl?: string             └─ todos?: BlockTodo[]

BucketBlock extends BlockBase    ScheduledBlock extends BlockBase
├─ status: "bucket"              ├─ status: "scheduled"
                                 ├─ startHour: number
                                 └─ endHour: number

Block = BucketBlock | ScheduledBlock   ← discriminated union

TripDay                          BlockTodo
├─ date: string                  ├─ id: string
├─ dayOfWeek: string             ├─ blockId: string  ← Block.id
├─ dateNum: number               ├─ text: string
└─ blocks: ScheduledBlock[]      └─ completed: boolean

Reaction
└─ memberId: string  ← Member.id
```

- `BlockBase.place` → `Place`: 컴포지션 (상속이 아님)
- `Block` discriminated union: `status` 필드로 bucket/scheduled 구분
- ID 참조: addedBy/lockedBy → Member.id, reactions[].memberId → Member.id

---

## 데이터 흐름 다이어그램

```
useRoomStore                         useCalendarStore
┌──────────────────┐                ┌───────────────────────────┐
│ room             │                │ tripDays: TripDay[]       │
│ members: Member[]│◄─── ID 참조 ──│   └─ blocks: Scheduled[]  │
│                  │                │ bucketBlocks: BucketBlock[]│
│                  │                │ selectedBlockId            │
└────────┬─────────┘                └──────────┬────────────────┘
         │                                     │
    ┌────┴────────────────┬────────────────────┤
    │                     │                    │
    ▼                     ▼                    ▼
CalendarHeader       DayHeader             TimeGrid
room.name            tripDays[]            tripDays[] (from calendar)
room.기간            → 일별 cost 합산       → date로 블록 필터
members 아바타                                │
총 cost 합산                                  ▼
                                          GridBlock
    Bucket                                block 위치 계산
    bucketBlocks                             │
        │                                    ▼
        ▼                              GridDraggableBlock
    BucketDraggableBlock               block, room.currency
    block, room.currency               members (lockedBy 조회)
    members (addedBy 조회)             reactions count
                                             │
                                        클릭 │ (DRAG_THRESHOLD 미만)
                                             ▼
                                       selectedBlockId 설정
                                             │
                                             ▼
                                      BlockDetailPanel
                                      findBlock(id)로 블록 조회
                                      room, members
                                      MOCK_BLOCK_TODOS (mock 직접 참조)
```

---

## 액션 흐름

### Bucket → Calendar 드래그

```
BucketDraggableBlock
  → useBucketDrag → useBlockDrag(onDrop)
  → 포인터 이동 > 5px → isDragging = true
  → 포인터 해제 → getDropPosition(gridRef, clientX, clientY)
  → moveToCalendar(block, date, startHour)
     ├─ bucketBlocks에서 제거
     └─ tripDays[date].blocks에 추가 (endHour = startHour + DEFAULT_BLOCK_DURATION)
```

### Calendar 내 드래그

```
GridDraggableBlock
  → useGridBlockDrag → useBlockDrag(onDrop, duration, onClick)
  → 포인터 이동 > 5px → isDragging = true
  → 포인터 해제 → getDropPosition(gridRef, clientX, clientY)
  → moveInCalendar(blockId, date, startHour)
     └─ 원래 day.blocks에서 제거, 새 day.blocks에 추가 (duration 유지)
```

### 블록 클릭 → 상세 패널

```
GridDraggableBlock
  → useGridBlockDrag → useBlockDrag(onDrop, duration, onClick)
  → 포인터 이동 < 5px (클릭)
  → onClick → setSelectedBlockId(block.id)
  → RoomDesktop에서 selectedBlockId 감지
  → BlockDetailPanel 렌더링
  → 닫기 → setSelectedBlockId(null)
```

### 블록 리사이즈

```
GridDraggableBlock
  → useGridBlockResize(block, top, height)
  → 상단/하단 핸들 드래그
  → 0.5시간 단위 스냅, 최소 0.5시간
  → 포인터 해제 → resizeBlock(blockId, newStartHour, newEndHour)
```

### Calendar → Bucket 이동

```
BlockDetailPanel "버킷으로 이동" 버튼 (미연결)
  → moveToBucket(block)
     ├─ tripDays[date].blocks에서 제거
     └─ bucketBlocks에 추가 (status "bucket"으로 변환, 시간 필드 제거)
```

---

## 좌표 → 시간 변환

`getDropPosition` (hooks/utils.ts):

```
clientX, clientY (화면 좌표)
  → gridRef.getBoundingClientRect() 기준 상대 좌표
  → grabOffsetY 보정 (블록 내 잡은 위치)
  → getDayIndex: relativeX / DAY_COL_MIN_W → dayIndex → tripDays[dayIndex].date
  → getHour: relativeY / HOUR_HEIGHT + gridStartHour → hour (0.5 단위 스냅)
  → 클램핑: gridStartHour ≤ hour ≤ gridEndHour - duration
```

---

## Mock 데이터 현황

| Mock | 사용 위치 | Store 관리 |
|------|----------|-----------|
| MOCK_BUCKET_BLOCKS | useCalendarStore 초기화 | O (bucketBlocks) |
| MOCK_CALENDAR_BLOCKS | useCalendarStore 초기화 (buildMockTripDays) | O (tripDays) |
| MOCK_ROOM | useRoomStore 초기화 | O (room) |
| MOCK_MEMBERS | useRoomStore 초기화 | O (members) |
| **MOCK_BLOCK_TODOS** | **BlockDetailPanel에서 직접 import** | **X** |

- Store 초기화 mock은 `NEXT_PUBLIC_USE_MOCK_DATA=true`일 때만 적용
- MOCK_CALENDAR_BLOCKS는 `MockBlock = ScheduledBlock & { dayIndex: number }` 타입으로, buildMockTripDays에서 dayIndex를 제거하고 tripDays에 분배
- MOCK_BLOCK_TODOS는 API에서 가져올 데이터이므로 store 관리 불필요 (블록 상세 열 때마다 fetch)

---

## Maps feature와의 연결점

```
Place (src/types)
    │
    ├── BlockBase.place (블록의 장소 정보)
    └── usePlaceSelection (maps/hooks)
        → Google Places API fetchFields → Place 생성
        → PlaceDetailSheet에 전달
```

- Maps에서 장소 선택 시 `Place` 타입으로 변환
- "일정에 추가" → `addToCalendar(place, date, startHour)`
- "버킷에 추가" → `addToBucket(place)`

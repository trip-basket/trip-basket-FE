# Calendar 데이터 흐름

## Store 구조

### useRoomStore (room feature)

방 전체에서 공유하는 데이터. Calendar, Maps 등 여러 feature에서 읽기 전용으로 참조한다.

```
room: Room | null        ← 방 정보 (name, 기간, currency, budget, inviteCode)
members: Member[]        ← 참여자 목록 (id, nickname, profileImageUrl, role)
days: Day[]              ← 여행 기간의 날짜 배열 (dayOfWeek, date)
```

- `days`는 room의 tripStartDate ~ tripEndDate에서 파생되는 데이터
- CalendarBlock의 `dayIndex`는 이 `days` 배열의 인덱스를 참조
- `addedBy`, `lockedBy`, `reactions[].memberId` → `members`에서 ID로 조회

### useCalendarBlockStore (calendar feature)

캘린더 블록의 배치와 상태를 관리한다.

```
bucketBlocks: Place[]           ← 미배치 장소 (Bucket에 표시)
calendarBlocks: CalendarBlock[] ← 배치된 일정 (Grid에 표시)
gridRef: HTMLDivElement | null  ← 시간 그리드 DOM 참조 (드래그 좌표 계산용)
selectedBlockId: string | null  ← 선택된 블록 → 상세 패널 표시
```

---

## 타입 관계

```
Place                           CalendarBlock extends Place
├─ id                           ├─ (Place 필드 전부)
├─ title                        ├─ dayIndex        ← days[] 인덱스
├─ category?    ─── BlockCategory   ├─ startHour
├─ cost?                        ├─ endHour
├─ addedBy?     ─── Member.id   ├─ reactions?  ─── Reaction[]
├─ lockedBy?    ─── Member.id   └─ memo?
└─ place?       ─── PlaceDetail

PlaceDetail                     BlockTodo
├─ placeId                      ├─ id
├─ placeName                    ├─ blockId  ─── CalendarBlock.id
├─ formattedAddress             ├─ text
├─ lat, lng                     └─ completed
├─ rating?
├─ reviewCount?
└─ openingHours?
```

- `Place` → `CalendarBlock`: dayIndex, startHour, endHour 추가
- `CalendarBlock` → `Place`: dayIndex, startHour, endHour, reactions, memo 제거
- ID 참조: addedBy/lockedBy → Member.id, reactions[].memberId → Member.id, dayIndex → days[]

---

## 데이터 흐름 다이어그램

```
useRoomStore                         useCalendarBlockStore
┌──────────────────┐                ┌──────────────────────┐
│ room             │                │ bucketBlocks: Place[] │
│ members: Member[]│◄─── ID 참조 ──│ calendarBlocks        │
│ days: Day[]      │◄─── dayIndex ─│ selectedBlockId       │
└────────┬─────────┘                └──────────┬───────────┘
         │                                     │
    ┌────┴────────────────┬────────────────────┤
    │                     │                    │
    ▼                     ▼                    ▼
CalendarHeader       DayHeader             TimeGrid
room.name            days[]                days[] (from room)
room.기간            calendarBlocks        calendarBlocks
members 아바타        → 일별 cost 합산       → dayIndex로 필터
총 cost 합산                                  │
                                              ▼
    Bucket                                 GridBlock
    bucketBlocks                           block 위치 계산
        │                                     │
        ▼                                     ▼
    BucketBlock                         GridDraggableBlock
    place props                         block, room.currency
    room.currency                       members (lockedBy 조회)
    members (addedBy 조회)              reactions count
                                              │
                                         클릭 │ (DRAG_THRESHOLD 미만)
                                              ▼
                                        selectedBlockId 설정
                                              │
                                              ▼
                                       BlockDetailPanel
                                       calendarBlocks에서 블록 조회
                                       room, members, days
                                       MOCK_BLOCK_TODOS (mock 직접 참조)
```

---

## 액션 흐름

### Bucket → Calendar 드래그

```
BucketBlock
  → useBucketDrag → useBlockDrag(onDrop)
  → 포인터 이동 > 5px → isDragging = true
  → 포인터 해제 → getDropPosition(gridRef, clientX, clientY)
  → moveToCalendar(place, dayIndex, startHour)
     ├─ bucketBlocks에서 제거
     └─ calendarBlocks에 추가 (endHour = startHour + 1)
```

### Calendar 내 드래그

```
GridBlock
  → useGridBlockDrag → useBlockDrag(onDrop, duration, onClick)
  → 포인터 이동 > 5px → isDragging = true
  → 포인터 해제 → getDropPosition(gridRef, clientX, clientY)
  → moveInCalendar(blockId, dayIndex, startHour)
     └─ dayIndex, startHour 변경 (duration 유지)
```

### 블록 클릭 → 상세 패널

```
GridBlock
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
     ├─ calendarBlocks에서 제거
     └─ bucketBlocks에 추가 (dayIndex/시간/reactions/memo 제거, Place 필드만 보존)
```

---

## 좌표 → 시간 변환

`getDropPosition` (hooks/utils.ts):

```
clientX, clientY (화면 좌표)
  → gridRef.getBoundingClientRect() 기준 상대 좌표
  → grabOffsetY 보정 (블록 내 잡은 위치)
  → getDayIndex: relativeX / DAY_COL_MIN_W → dayIndex
  → getHour: relativeY / HOUR_HEIGHT + gridStartHour → hour (0.5 단위 스냅)
  → 클램핑: gridStartHour ≤ hour ≤ gridEndHour - duration
```

---

## Mock 데이터 현황

| Mock | 사용 위치 | Store 관리 |
|------|----------|-----------|
| MOCK_PLACES | useCalendarBlockStore 초기화 | O (bucketBlocks) |
| MOCK_CALENDAR_BLOCKS | useCalendarBlockStore 초기화 | O (calendarBlocks) |
| MOCK_ROOM | useRoomStore 초기화 | O (room) |
| MOCK_MEMBERS | useRoomStore 초기화 | O (members) |
| MOCK_DAYS | useRoomStore 초기화 | O (days) |
| **MOCK_BLOCK_TODOS** | **BlockDetailPanel에서 직접 import** | **X** |

- Store 초기화 mock은 `NEXT_PUBLIC_USE_MOCK_DATA=true`일 때만 적용
- MOCK_BLOCK_TODOS는 API에서 가져올 데이터이므로 store 관리 불필요 (블록 상세 열 때마다 fetch)

---

## Maps feature와의 연결점

```
PlaceDetail (calendar/types)
    │
    ├── CalendarBlock.place (캘린더 블록의 장소 정보)
    └── usePlaceSelection (maps/hooks)
        → Google Places API fetchFields → PlaceDetail 생성
        → PlaceDetailSheet에 전달
```

- Maps에서 장소 선택 시 `PlaceDetail` 타입으로 변환
- "일정에 추가" / "버킷에 추가" 버튼은 UI만 존재, 액션 미연결

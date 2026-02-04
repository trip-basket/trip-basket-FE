# 블록 인터랙션 구현 계획

## 목표
캘린더에서 블록을 드래그로 이동하고, 가장자리를 드래그해서 리사이즈하는 인터랙션 구현.

---

## Step 1: Block 타입 정의

**파일**: `src/feature/calendar/types/block.ts` (신규)

```ts
export type Block = {
  id: string;
  title: string;
  dayIndex: number;
  /** 시작 시각 (7 = 07:00, 9.5 = 09:30) */
  startHour: number;
  /** 지속 시간 (시간 단위, 0.5 = 30분) */
  duration: number;
};
```

- id를 string(nanoid 등)으로 변경 — 추후 서버/실시간 동기화에 유리
- startHour/duration을 소수로 표현하여 30분 스냅 지원 (0.5 단위)
- 장소 정보는 이후 단계에서 확장

---

## Step 2: Block 상태 관리 (Zustand store)

**파일**: `src/feature/calendar/stores/block-store.ts` (신규)

```ts
interface BlockState {
  blocks: Block[];
  addBlock: (block: Block) => void;
  updateBlock: (id: string, patch: Partial<Omit<Block, 'id'>>) => void;
  removeBlock: (id: string) => void;
}
```

- 기존 MOCK_EVENTS를 Block[]으로 변환해서 초기값으로 사용
- updateBlock으로 드래그/리사이즈 결과 반영

---

## Step 3: 30분 스냅 유틸리티

**파일**: `src/feature/calendar/utils/snap.ts` (신규)

```ts
/** 픽셀 오프셋을 30분 단위 시간값으로 스냅 */
export function pxToSnappedHour(px: number, hourHeight: number, baseHour: number): number
```

- HOUR_HEIGHT(72px) 기준으로 px → 시간 변환
- 0.5 단위로 반올림(snap)
- 최소/최대 시간 범위 클램프 (7 ~ 24)

---

## Step 4: 블록 드래그 이동 (useBlockDrag hook)

**파일**: `src/feature/calendar/hooks/use-block-drag.ts` (신규)

**동작**:
1. 블록 본체를 pointerdown → 드래그 시작
2. pointermove → 블록의 top 위치를 마우스에 따라 실시간 업데이트 (시각적 피드백)
3. pointerup → 30분 단위로 스냅된 위치에 블록 확정, store 업데이트

**구현 방식**:
- `setPointerCapture`로 드래그 캡처 (기존 resizer 패턴 활용)
- 드래그 중에는 로컬 offset state로 시각적 위치만 변경
- 드래그 끝나면 store.updateBlock 호출
- 같은 날짜 컬럼 내 세로 이동만 우선 구현 (날짜 간 이동은 이후 확장)

---

## Step 5: 블록 리사이즈 (useBlockResize hook)

**파일**: `src/feature/calendar/hooks/use-block-resize.ts` (신규)

**동작**:
1. 블록 하단 가장자리에 리사이즈 핸들 영역 (하단 8px)
2. pointerdown → 리사이즈 시작
3. pointermove → duration 실시간 변경 (시각적 피드백)
4. pointerup → 30분 단위 스냅 후 store 업데이트

**제약**:
- 최소 duration: 0.5 (30분)
- 최대: 하단이 24시를 넘지 않도록

---

## Step 6: TimeGrid 컴포넌트 리팩터링

**파일**: `src/feature/calendar/components/time-grid.tsx` (수정)

변경사항:
- MOCK_EVENTS 대신 Zustand store에서 blocks 읽기
- 각 블록에 drag/resize 핸들러 연결
- 리사이즈 핸들 영역 (하단 커서 `ns-resize`)
- 드래그 중 블록에 시각적 피드백 (opacity, shadow 등)

---

## Step 7: BlockBucket 컴포넌트 업데이트

**파일**: `src/feature/calendar/components/block-bucket.tsx` (수정)

- MOCK_EVENTS 대신 store에서 bucket용 blocks 읽기
- Bucket → 캘린더 드래그는 이 단계에서는 미구현 (별도 태스크)

---

## 파일 변경 요약

| 파일 | 작업 |
|------|------|
| `src/feature/calendar/types/block.ts` | 신규 - Block 타입 |
| `src/feature/calendar/stores/block-store.ts` | 신규 - Zustand store |
| `src/feature/calendar/utils/snap.ts` | 신규 - 30분 스냅 유틸 |
| `src/feature/calendar/hooks/use-block-drag.ts` | 신규 - 드래그 hook |
| `src/feature/calendar/hooks/use-block-resize.ts` | 신규 - 리사이즈 hook |
| `src/feature/calendar/components/time-grid.tsx` | 수정 - store 연동 + 인터랙션 |
| `src/feature/calendar/components/block-bucket.tsx` | 수정 - store 연동 |
| `src/feature/calendar/constants/calendar-config.ts` | 수정 - mock 데이터를 Block[] 형태로 변환 |

## 이 단계에서 하지 않는 것
- Bucket ↔ 캘린더 간 드래그 앤 드롭
- 날짜 간(컬럼 간) 블록 이동
- 실시간 동기화
- 장소 정보 연동

## 검증 방법
- `pnpm dev`로 로컬 실행
- 캘린더에서 블록을 위아래로 드래그하여 시간대 변경 확인
- 블록 하단을 드래그하여 길이 조절 확인
- 30분 단위로 스냅되는지 확인
- 드래그/리사이즈 후 블록이 정확한 위치에 고정되는지 확인

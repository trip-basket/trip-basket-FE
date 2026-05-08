# Backlog

이 PR(`feat/block-api`) 작업 중 식별됐지만 범위 밖으로 분리한 항목.

## 보류 (별도 작업으로 처리)

### block-api-mapper 시간 변환 분 단위 정규화
- **문제**: `parseHour()`는 날짜 차이를 무시하고 시:분만 반환. `toDateTimeString()`은 hour >= 24일 때 다음 날로 넘김. 비대칭으로 인해 endTime이 다음 날로 저장된 블록을 다시 읽으면 endHour < startHour가 될 수 있음. 또한 `Math.round((remainingHour - h) * 60)` 결과가 60이 되는 케이스 존재.
- **현재 영향 없음**: 클라이언트가 `endHour`를 항상 0~24 범위로만 전송 (time-selector 마지막 옵션 필터, duration-dialog `maxDuration={24 - startHour}` 가드). 백엔드 명세도 자정 넘김 제약 없음이지만 우리 측에서 발생시키지 않음.
- **개선 방향**: 전체 분(`Math.round(hour * 60)`) 기준 dayOffset/hour/minute 정규화로 안전망 확보.
- 출처: CodeRabbit PR #25 review (utils/block-api-mapper.ts)

### time-grid 키보드 접근성
- **문제**: 새 블록 생성이 포인터 hover/click에만 묶여 있어 키보드 사용자에게 진입 경로가 없음.
- **개선 방향**: 그리드 컨테이너에 `tabIndex` + `onKeyDown` (Enter/Space로 동일한 생성 로직 호출), 또는 동등한 기능을 가진 별도 버튼/메뉴 노출.
- 출처: CodeRabbit PR #25 review (components/grid/time-grid.tsx)

### use-init-room refetch 시 임시 블록 보호
- **문제**: `blocksQuery.data` 변경마다 `initBlocks`가 호출되어 `bucketBlocks`를 통째로 덮어씀. 드래그·리사이즈 중 refetch가 일어나면 진행 중인 임시 블록(`tempBlock`) 상태가 손실될 수 있음.
- **개선 방향**: 초기 로드 vs refetch 구분(mounted 플래그), refetch 시 임시 블록을 보존하면서 머지. 또는 `initBlocks`를 `syncBlocks`로 리네이밍하면서 책임 분리.
- 출처: CodeRabbit PR #25 review (feature/room/hooks/use-init-room.ts)

### cost-dialog 폼 통일
- **문제**: raw `<input>`을 직접 사용. 프로젝트 컨벤션은 공용 `Input` + `react-hook-form` + zod.
- **현재 상태**: 검증(finite/non-negative) 보강은 완료. 폼 통일은 변경량이 커서 분리.
- **개선 방향**: `useForm` + `zodResolver`로 schema 검증, raw input → 공용 `Input` 컴포넌트로 교체.
- 출처: CodeRabbit PR #25 review (components/panel/dialogs/cost-dialog.tsx)

## 추가 고려 (명세 확인 후 결정)

### timezoneId / UTC offset 처리
- BlockResponseDto에 `timezoneId`, `startUtcOffsetMinutes`, `endUtcOffsetMinutes` 필드가 있음. 클라이언트 mapper는 현재 사용하지 않음.
- DST 전환 시점의 블록 처리, 다른 시간대 방의 표시 등에서 영향 가능. 멀티 시간대 지원 시점에 mapper 정비 필요.

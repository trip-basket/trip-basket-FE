# UI 공통 컴포넌트 사용 규칙

## 필수 사용

아래 컴포넌트가 커버하는 영역에서는 **반드시** 공통 컴포넌트를 사용한다. raw HTML 태그(`<span>`, `<p>`, `<button>`, `<input>` 등)를 직접 쓰지 않는다.

### Text

모든 텍스트 요소에 사용. `<span>`, `<p>`, `<h1>`~`<h4>` 대신 `Text`를 쓴다.

```tsx
import { Text } from "@/src/components/ui";

<Text variant="h2">제목</Text>
<Text variant="small" color="muted">설명</Text>
<Text as="span" variant="caption" weight="semibold">라벨</Text>
```

- **variant**: `display` | `h1` | `h2` | `h3` | `h4` | `body` | `small` | `caption`
- **color**: `main` | `sub` | `soft` | `muted` | `inverse` | `error` | `success` | `action`
- **weight**: `normal` | `medium` | `semibold` | `bold` | `extrabold`
- **as**: 렌더링 태그 오버라이드 (`as="span"`, `as="label"` 등)

**예외**: `<textarea>`, 버튼 내부에서 부모가 스타일을 제어하는 인라인 텍스트, 동적 `style`로 색상을 주입하는 chip/badge 컨테이너.

### Button

모든 클릭 가능한 액션 요소에 사용. 아이콘 전용 버튼은 `variant="icon"`을 쓴다.

```tsx
import { Button } from "@/src/components/ui";

<Button variant="solid" color="primary" size="md">확인</Button>
<Button variant="outline" color="danger" size="sm">삭제</Button>
```

- **variant**: `solid` | `outline` | `ghost` | `link` | `icon`
- **color**: `primary` | `danger` | `neutral`
- **size**: `sm` | `md` | `lg`

**예외**: 드래그 핸들, 체크박스 토글 등 시맨틱이 버튼이 아닌 인터랙티브 요소.

### Input

텍스트 입력 필드에 사용.

### Avatar

사용자 프로필 표시에 사용.

### Modal / BottomSheet

모달 UI에 사용. Zustand 기반 모달 시스템.

import { Button, Text } from "@/src/components/ui";
import { formatCurrency } from "../../utils";

// TODO: 통화 설정 기능 추후 추가
export function CostChip({ cost, currency }: { cost: number; currency: string }) {
  return (
    <Button variant="bordered" size="sm" className="tabular-nums">
      <Text variant="caption" weight="bold" className="text-inherit tabular-nums">
        {formatCurrency(cost, currency)}
      </Text>
    </Button>
  );
}

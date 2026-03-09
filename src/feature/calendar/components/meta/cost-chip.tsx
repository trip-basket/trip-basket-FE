import { Text } from "@/src/components/ui";
import { formatCurrency } from "../../utils";

export function CostChip({ cost, currency }: { cost: number; currency: string }) {
  return (
    <button type="button" className="chip-inset chip-inset--strong tabular-nums">
      <Text variant="caption" className="text-inherit tabular-nums">
        {formatCurrency(cost, currency)}
      </Text>
    </button>
  );
}

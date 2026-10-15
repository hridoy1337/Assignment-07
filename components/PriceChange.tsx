import type { Change } from "@/lib/types";
import { changeState, changeTone, formatPct } from "@/lib/format";

export default function PriceChange({ change }: { change: Change }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${changeTone[changeState(change)].badge}`}
    >
      {formatPct(change)}
    </span>
  );
}

import type { Product } from "@/lib/types";
import { changeState, changeTone, formatPct, formatPrice, unitLabel } from "@/lib/format";

export default function Ticker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-b border-base-300 bg-white">
      <div className="ticker-track flex w-max animate-marquee py-2.5">
        {items.map((p, index) => (
          <div
            key={`${p.id}-${index}`}
            className="flex items-center gap-2 border-r border-base-300 px-5 text-sm whitespace-nowrap"
          >
            <span>{p.image}</span>
            <span className="font-semibold text-gray-900">{p.nameBn}</span>
            <span className="text-gray-700">
              {formatPrice(p.today)} টাকা/{unitLabel(p.unit)}
            </span>
            <span className={`font-semibold ${changeTone[changeState(p.change)].text}`}>
              {formatPct(p.change)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

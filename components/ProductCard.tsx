import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatTaka, unitLabel } from "@/lib/format";
import PriceChange from "./PriceChange";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-base-200 text-3xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900">{product.nameBn}</h3>
          <p className="text-sm text-gray-500">প্রতি {unitLabel(product.unit)}</p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2 border-t border-base-300 pt-3">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-900">{formatTaka(product.today)}</p>
        </div>
        <PriceChange change={product.change} />
      </div>
    </Link>
  );
}

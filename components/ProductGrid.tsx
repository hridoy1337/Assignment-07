"use client";

import { useMemo, useState } from "react";
import type { Product, SortKey } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") return list.sort((a, b) => a.today - b.today);
    if (sort === "desc") return list.sort((a, b) => b.today - a.today);
    return list;
  }, [products, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="select select-bordered select-sm sm:select-md bg-white"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

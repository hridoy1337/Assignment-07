import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import ProductSkeleton from "@/components/ProductSkeleton";
import { getProducts } from "@/lib/api";
import { banglaDate, toBn, topMovers } from "@/lib/format";

async function HomeSections() {
  const products = await getProducts();
  const risers = topMovers(products, "up");
  const fallers = topMovers(products, "down");

  return (
    <>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          <span className="text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          <span className="text-green-600">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="flex flex-col gap-4 scroll-mt-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-sm text-gray-600">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <ProductGrid products={products} />
      </section>
    </>
  );
}

function HomeFallback() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="skeleton h-8 w-48"></div>
        <ProductSkeleton count={6} />
      </section>
      <section className="flex flex-col gap-4">
        <div className="skeleton h-8 w-48"></div>
        <ProductSkeleton count={6} />
      </section>
      <section className="flex flex-col gap-4">
        <div className="skeleton h-8 w-32"></div>
        <ProductSkeleton count={8} />
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8">
      <Hero dateLabel={banglaDate()} />
      <Suspense fallback={<HomeFallback />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}

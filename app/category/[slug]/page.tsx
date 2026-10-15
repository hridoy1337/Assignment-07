import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import ProductGrid from "@/components/ProductGrid";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/format";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    return (
      <EmptyState
        title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
        message="এখনও এই ক্যাটাগরিতে কোনো পণ্যের দাম যোগ করা হয়নি।"
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-base-300 text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{category.nameBn}</h1>
          <p className="text-sm text-gray-600">মোট {toBn(products.length)}টি পণ্য</p>
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}

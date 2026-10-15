import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-6">
      <div className="skeleton h-10 w-48"></div>
      <ProductSkeleton count={8} />
    </div>
  );
}

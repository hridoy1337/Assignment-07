export default function ProductSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="skeleton h-12 w-12 rounded-xl"></div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-3 w-16"></div>
            </div>
          </div>
          <div className="flex items-end justify-between border-t border-base-300 pt-3">
            <div className="flex flex-col gap-2">
              <div className="skeleton h-3 w-14"></div>
              <div className="skeleton h-5 w-24"></div>
            </div>
            <div className="skeleton h-5 w-14 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

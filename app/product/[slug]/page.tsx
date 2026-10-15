import { notFound, redirect } from "next/navigation";
import PriceChange from "@/components/PriceChange";
import { getProduct } from "@/lib/api";
import { getSession } from "@/lib/session";
import { formatTaka, groupByDivision, marketSummary, unitLabel } from "@/lib/format";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const session = await getSession();
  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}&protected=1`);
  }

  const product = await getProduct(slug);
  if (!product) notFound();

  const summary = marketSummary(product);
  const groups = groupByDivision(product.markets ?? []);

  const history = [
    { label: "আজ", value: product.today },
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8">
      <section className="rounded-2xl border border-base-300 bg-white p-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-5xl">
          {product.image}
        </span>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{product.nameBn}</h1>
            <PriceChange change={product.change} />
          </div>
          <p className="text-gray-600">
            আজকের গড় বাজারদর {formatTaka(product.today)}, প্রতি {unitLabel(product.unit)}।
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-outline badge-primary gap-1 py-3">
              {product.categoryIcon} {product.categoryNameBn}
            </span>
            <span className="badge badge-outline py-3">প্রতি {unitLabel(product.unit)}</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-base-300 bg-white p-5">
          <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
          <p className="text-2xl font-bold text-green-700">{formatTaka(summary.min)}</p>
        </div>
        <div className="rounded-2xl border border-base-300 bg-white p-5">
          <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
          <p className="text-2xl font-bold text-red-700">{formatTaka(summary.max)}</p>
        </div>
        <div className="rounded-2xl border border-base-300 bg-white p-5">
          <p className="text-sm text-gray-500">গড় দাম</p>
          <p className="text-2xl font-bold text-gray-900">{formatTaka(summary.avg)}</p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-gray-900">দামের তুলনা</h2>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {history.map((item) => (
            <div key={item.label} className="rounded-2xl border border-base-300 bg-white p-4">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-lg font-semibold text-gray-900">{formatTaka(item.value)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
        {groups.length === 0 ? (
          <p className="text-gray-600">এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {groups.map(([division, markets]) => (
              <div key={division} className="rounded-2xl border border-base-300 bg-white overflow-hidden">
                <div className="bg-base-200 px-4 py-2 font-semibold text-gray-800">{division}</div>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>বাজার</th>
                        <th className="text-right">সর্বনিম্ন</th>
                        <th className="text-right">সর্বোচ্চ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {markets.map((m) => (
                        <tr key={m.market}>
                          <td>{m.market}</td>
                          <td className="text-right text-green-700">{formatTaka(m.min)}</td>
                          <td className="text-right text-red-700">{formatTaka(m.max)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import Link from "next/link";

type Props = {
  title: string;
  message: string;
};

export default function EmptyState({ title, message }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center gap-4 text-center">
      <span className="text-6xl">🧺</span>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 max-w-md">{message}</p>
      <Link href="/" className="btn btn-primary">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

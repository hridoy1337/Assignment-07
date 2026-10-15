import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-gray-900">{title}</h1>
      <p className="mb-4 text-center text-sm text-gray-500">{subtitle}</p>
      <div className="w-full max-w-[21rem] rounded-2xl border border-base-300 bg-[#fbfdf9] p-5">
        {children}
      </div>
      <Link href="/" className="mt-6 text-sm text-gray-500 hover:text-primary">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

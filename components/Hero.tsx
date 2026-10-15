import Image from "next/image";

export default function Hero({ dateLabel }: { dateLabel: string }) {
  return (
    <section className="rounded-3xl border border-base-300 bg-[#fbfdf9] px-6 py-8 md:px-10 md:py-10">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col items-start gap-4">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-primary">
            {dateLabel}
          </span>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="max-w-xl text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-2">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="তাজা বাজারের ঝুড়ি"
            width={315}
            height={263}
            priority
            className="h-auto w-full max-w-[18rem] md:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}

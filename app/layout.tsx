import type { Metadata } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/api";
import { banglaDate } from "@/lib/format";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "বাজার দর — আজকের দামের তালিকা",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম, বাজারভিত্তিক তুলনা ও দামের পরিবর্তন এক জায়গায়।",
  icons: {
    icon: "/logo-icon.png",
      },
};

export const dynamic = "force-dynamic";

async function TickerLoader() {
  const products = await getProducts();
  return <Ticker products={products} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="bazar">
      <body className={`${hind.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar dateLabel={banglaDate()} />
        <Suspense fallback={<div className="h-11 border-b border-base-300 bg-white"></div>}>
          <TickerLoader />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const categories = [
  { slug: "chal", nameBn: "চাল", icon: "🍚" },
  { slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default function Navbar({ dateLabel }: { dateLabel: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  function closeMenu() {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }

  return (
    <header className="border-b border-base-300 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary sm:h-10 sm:w-10">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={18}
                height={18}
                className="h-5 w-5 brightness-0 invert"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-gray-900 sm:text-xl">বাজার দর</span>
              <span className="text-xs text-gray-500 sm:text-sm">{dateLabel}</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-8 w-28 sm:h-10 sm:w-36"></div>
            ) : session ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-base-200"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
                      {session.user.name.charAt(0)}
                    </span>
                  )}
                  <span className="max-w-[7rem] truncate text-sm font-medium text-gray-900 sm:max-w-[12rem]">
                    {session.user.name}
                  </span>
                  <span className="text-[10px] text-gray-500">▼</span>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-20 mt-2 w-48 rounded-box border border-base-300 bg-white p-2 shadow"
                >
                  <li>
                    <Link href="/profile" onClick={closeMenu}>
                      আমার প্রোফাইল
                    </Link>
                  </li>
                  <li>
                    <button type="button" onClick={handleSignOut}>
                      সাইন আউট
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="-mx-4 border-t border-base-300 px-4">
          <ul className="flex justify-start gap-1 overflow-x-auto py-1.5">
            {categories.map((cat) => {
              const active = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.slug} className="shrink-0">
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-green-100 text-primary"
                        : "text-gray-700 hover:bg-base-200"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

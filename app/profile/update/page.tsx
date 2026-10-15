import Link from "next/link";
import { redirect } from "next/navigation";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getSession } from "@/lib/session";

export default async function UpdateProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?callbackURL=%2Fprofile%2Fupdate&protected=1");
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
        <Link href="/profile" className="text-sm font-medium text-primary hover:underline">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
      <div className="rounded-2xl border border-base-300 bg-white p-6">
        <UpdateProfileForm currentName={session.user.name} />
      </div>
    </div>
  );
}

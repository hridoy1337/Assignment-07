import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?callbackURL=%2Fprofile&protected=1");
  }

  const { user } = session;

  return (
    <div className="max-w-xl mx-auto px-4 py-12 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <div className="rounded-2xl border border-base-300 bg-white p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img src={user.image} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-content">
              {user.name.charAt(0)}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold text-gray-900">{user.name}</p>
            <p className="truncate text-gray-600">{user.email}</p>
          </div>
        </div>
        <Link href="/profile/update" className="btn btn-primary w-full sm:w-auto sm:self-start">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}

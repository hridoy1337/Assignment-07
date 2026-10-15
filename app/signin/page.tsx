import AuthShell from "@/components/AuthShell";
import SignInForm from "@/components/SignInForm";

type Props = {
  searchParams: Promise<{ callbackURL?: string; protected?: string }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const params = await searchParams;
  const callbackURL = params.callbackURL?.startsWith("/") ? params.callbackURL : "/";

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <SignInForm callbackURL={callbackURL} protectedRoute={params.protected === "1"} />
    </AuthShell>
  );
}

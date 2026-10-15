import AuthShell from "@/components/AuthShell";
import SignUpForm from "@/components/SignUpForm";

type Props = {
  searchParams: Promise<{ callbackURL?: string }>;
};

export default async function SignUpPage({ searchParams }: Props) {
  const params = await searchParams;
  const callbackURL = params.callbackURL?.startsWith("/") ? params.callbackURL : "/";

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <SignUpForm callbackURL={callbackURL} />
    </AuthShell>
  );
}

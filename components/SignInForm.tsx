"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthDivider from "./AuthDivider";
import SocialButtons from "./SocialButtons";

type Props = {
  callbackURL: string;
  protectedRoute: boolean;
};

const inputClass =
  "input input-bordered input-sm h-9 w-full rounded-lg border-base-300 bg-[#fbfdf9] focus:border-primary focus:outline-none";

export default function SignInForm({ callbackURL, protectedRoute }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const notified = useRef(false);

  useEffect(() => {
    if (protectedRoute && !notified.current) {
      notified.current = true;
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন");
    }
  }, [protectedRoute]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email: email.trim(), password });
    setLoading(false);

    if (error) {
      console.error(error);
      toast.error(error.message || error.statusText || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackURL);
    router.refresh();
  }

  const signUpHref =
    callbackURL === "/" ? "/signup" : `/signup?callbackURL=${encodeURIComponent(callbackURL)}`;

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-gray-800">ইমেইল</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
			placeholder="you@example.com"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-gray-800">পাসওয়ার্ড</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            autoComplete="current-password"
			placeholder="কমপক্ষে ৮ অক্ষর"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-sm mt-1 h-9 min-h-9 w-full rounded-lg"
        >
          {loading ? <span className="loading loading-spinner loading-xs"></span> : "সাইন ইন"}
        </button>
      </form>

      <AuthDivider />

      <SocialButtons callbackURL={callbackURL} />

      <p className="text-center text-[13px] text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link href={signUpHref} className="text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

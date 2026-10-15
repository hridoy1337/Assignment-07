"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthDivider from "./AuthDivider";
import SocialButtons from "./SocialButtons";

const inputClass =
  "input input-bordered input-sm h-9 w-full rounded-lg border-base-300 bg-[#fbfdf9] focus:border-primary focus:outline-none";

export default function SignUpForm({ callbackURL }: { callbackURL: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInHref =
    callbackURL === "/" ? "/signin" : `/signin?callbackURL=${encodeURIComponent(callbackURL)}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }

    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) {
      console.error(error);
      toast.error(error.message || error.statusText || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push(signInHref);
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-gray-800">নাম</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            autoComplete="name"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-gray-800">ইমেইল</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-gray-800">পাসওয়ার্ড</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            autoComplete="new-password"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[13px] font-medium text-gray-800">পাসওয়ার্ড নিশ্চিত করুন</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
            autoComplete="new-password"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-sm mt-1 h-9 min-h-9 w-full rounded-lg"
        >
          {loading ? <span className="loading loading-spinner loading-xs"></span> : "সাইন আপ"}
        </button>
      </form>

      <AuthDivider />

      <SocialButtons callbackURL="/" />

      <p className="text-center text-[13px] text-gray-600">
        অ্যাকাউন্ট আছে?{" "}
        <Link href={signInHref} className="text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}

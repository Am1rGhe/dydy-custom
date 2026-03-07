"use client";

import { createClientSupabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const redirectTo = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({ resolver: zodResolver(forgotSchema) });

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClientSupabase();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/auth/reset-password${
            redirectTo && redirectTo !== "/"
              ? `?redirect=${encodeURIComponent(redirectTo)}`
              : ""
          }`,
        }
      );

      if (resetError) {
        setError(resetError.message);
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setIsLoading(false);
    } catch (_err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Forgot password</h2>
          <p className="mt-2 text-gray-600">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-xl"
        >
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              If an account exists for that email, we&apos;ve sent a reset link.
              Please check your inbox.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending link...
              </>
            ) : (
              "Send reset link"
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href={
                  redirectTo && redirectTo !== "/"
                    ? `/auth/login?redirect=${encodeURIComponent(redirectTo)}`
                    : "/auth/login"
                }
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Back to login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    }>
      <ForgotPasswordContent />
    </Suspense>
  );
}


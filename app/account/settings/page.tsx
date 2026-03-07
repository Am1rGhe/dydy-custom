"use client";

import { createClientSupabase } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Package, Settings, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const passwordSchema = z
  .object({
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    setValue: setProfileValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClientSupabase();
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        if (!currentUser) {
          router.push("/auth/login?redirect=/account/settings");
          return;
        }

        setUser(currentUser);
        setProfileValue("name", currentUser.user_metadata?.name || currentUser.email?.split("@")[0] || "");
        setIsLoading(false);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router, setProfileValue]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    setProfileError(null);
    setProfileSuccess(false);

    try {
      const supabase = createClientSupabase();
      const { error } = await supabase.auth.updateUser({
        data: { name: data.name },
      });

      if (error) throw error;

      setProfileSuccess(true);
    } catch (err: any) {
      setProfileError(err.message || "Failed to update profile");
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setPasswordError(null);
    setPasswordSuccess(false);

    try {
      const supabase = createClientSupabase();
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;

      setPasswordSuccess(true);
      resetPasswordForm();
    } catch (err: any) {
      setPasswordError(err.message || "Failed to update password");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 sticky top-4">
              <div className="mb-6">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-white text-center">
                  {user.user_metadata?.name || user.email?.split("@")[0] || "User"}
                </h2>
                <p className="text-sm text-neutral-400 text-center mt-1">
                  {user.email}
                </p>
              </div>

              <nav className="space-y-2">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 text-neutral-300 hover:bg-transparent hover:text-amber-400 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-3 px-4 py-3 text-neutral-300 hover:bg-transparent hover:text-amber-400 rounded-lg transition-colors"
                >
                  <Package className="w-5 h-5" />
                  Orders
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center gap-3 px-4 py-3 bg-amber-500/10 text-amber-400 rounded-lg font-medium"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 lg:p-8">
              <h1 className="text-3xl font-bold text-white mb-8">
                Account Settings
              </h1>

              {/* Profile Section */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4">
                  Profile Information
                </h2>
                <form
                  onSubmit={handleProfileSubmit(onProfileSubmit)}
                  className="space-y-4 max-w-md"
                >
                  {profileSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                      Profile updated successfully!
                    </div>
                  )}
                  {profileError && (
                    <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-3 rounded">
                      {profileError}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      Display Name
                    </label>
                    <input
                      {...registerProfile("name")}
                      type="text"
                      className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                      placeholder="Your name"
                    />
                    {profileErrors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {profileErrors.name.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-black text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Update Profile
                  </button>
                </form>
              </div>

              {/* Password Section */}
              <div className="border-t pt-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Change Password
                </h2>
                <form
                  onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                  className="space-y-4 max-w-md"
                >
                  {passwordSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                      Password updated successfully!
                    </div>
                  )}
                  {passwordError && (
                    <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-3 rounded">
                      {passwordError}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      New Password
                    </label>
                    <input
                      {...registerPassword("newPassword")}
                      type="password"
                      className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                      placeholder="Enter new password"
                    />
                    {passwordErrors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {passwordErrors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      {...registerPassword("confirmPassword")}
                      type="password"
                      className="w-full px-4 py-3 border border-neutral-700 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                      placeholder="Confirm new password"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {passwordErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-black text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

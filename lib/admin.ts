import { createAdminSupabase } from "@/lib/supabase/admin";

// Check if a user email is in the admin_users table.
export async function isAdminUser(email: string | undefined): Promise<boolean> {
  if (!email) return false;
  try {
    const supabase = createAdminSupabase();
    const { data } = await supabase
      .from("admin_users")
      .select("email")
      .eq("email", email.toLowerCase().trim())
      .single();
    return !!data;
  } catch {
    return false;
  }
}

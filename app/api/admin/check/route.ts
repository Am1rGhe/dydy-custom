import { createServerSupabase } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/admin";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = !!(user && (await isAdminUser(user.email ?? undefined)));
  return NextResponse.json({ isAdmin });
}

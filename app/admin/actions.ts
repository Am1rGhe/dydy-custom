"use server";

import { createAdminSupabase } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/admin";
import { revalidatePath } from "next/cache";

async function ensureAdmin() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !(await isAdminUser(user.email ?? undefined))) {
    throw new Error("Unauthorized");
  }
}

export async function deleteProduct(productId: string) {
  await ensureAdmin();
  const supabase = createAdminSupabase();
  const { error } = await supabase.from("products").delete().eq("id", productId);
  if (error) throw error;
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function createCategory(data: { name: string; slug: string }) {
  await ensureAdmin();
  const supabase = createAdminSupabase();
  const { error } = await supabase.from("categories").insert(data);
  if (error) throw error;
  revalidatePath("/admin/categories");
  revalidatePath("/shop");
}

export async function updateOrderStatus(orderId: string, status: string) {
  await ensureAdmin();
  const supabase = createAdminSupabase();
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);
  if (error) throw error;
  revalidatePath("/admin/orders");
}

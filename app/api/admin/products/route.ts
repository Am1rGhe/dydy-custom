import { createAdminSupabase } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// supabase storage bucket used for product images
const STORAGE_BUCKET = "product-images";

// throws if the current request is not from an admin (checks session + admin_users table)
async function ensureAdmin() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !(await isAdminUser(user.email ?? undefined))) {
    throw new Error("Unauthorized");
  }
}

// creates the product-images bucket if it doesnt exist (ignores "already exists" error)
async function ensureBucket(supabase: ReturnType<typeof createAdminSupabase>) {
  const { error } = await supabase.storage.createBucket(STORAGE_BUCKET, {
    public: true,
  });
  if (error && !error.message?.toLowerCase().includes("already exists")) {
    throw new Error(error.message);
  }
}

// uploads a file to product-images and returns its public url
async function uploadImage(file: File): Promise<string> {
  const supabase = createAdminSupabase();
  try {
    await ensureBucket(supabase);
  } catch {
    // bucket may already exist
  }
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, { contentType: file.type });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(data.path);
  return publicUrl;
}

// create a new product from form data (name, price, category, optional image, sizes, etc.)
export async function POST(request: NextRequest) {
  try {
    await ensureAdmin();
    const formData = await request.formData();

    const name = (formData.get("name") as string)?.trim();
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    const description = (formData.get("description") as string)?.trim() || null;
    const basePriceRaw = formData.get("base_price") as string;
    const base_price = parseFloat(basePriceRaw);
    if (isNaN(base_price) || base_price < 0) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid price" },
        { status: 400 }
      );
    }

    const in_stock = formData.get("in_stock") === "true";
    const featured = formData.get("featured") === "true";
    const category_id = (formData.get("category_id") as string)?.trim();
    if (!category_id) {
      return NextResponse.json(
        { success: false, error: "Category is required" },
        { status: 400 }
      );
    }
    const imageFile = formData.get("image") as File | null;

    let image_url: string | null = null;
    if (imageFile && imageFile.size > 0) {
      image_url = await uploadImage(imageFile);
    }

    const sizes = (formData.getAll("sizes") as string[]) || [];

    // slug from name (lowercase, hyphens), then add timestamp so it stays unique
    const slug =
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "product";

    const slugWithId = `${slug}-${Date.now().toString(36)}`;

    const supabase = createAdminSupabase();
    const { error } = await supabase.from("products").insert({
      name,
      slug: slugWithId,
      description,
      base_price,
      in_stock,
      featured,
      category_id,
      image_url: image_url || null,
      sizes: sizes.length > 0 ? sizes : null,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create product";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Admin-only aggregate ilgi görünümü: plaka başına toplam görüntüleme ve
 * benzersiz oturum sayısı. Ham satırlara (plate_view_events) hiçbir
 * yerden doğrudan SELECT izni yok — bu yalnızca SECURITY DEFINER
 * `plate_view_summary()` fonksiyonunu çağırır (bkz. migration).
 */
export const getPlateViewSummary = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error("Role check failed");
    if (!isAdmin) throw new Error("Forbidden: admin role required");

    const { data, error } = await context.supabase.rpc("plate_view_summary");
    if (error) throw new Error(error.message);
    return { summary: data ?? [] };
  });

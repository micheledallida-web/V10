import { NextResponse } from "next/server";

import { getMissingSupabaseEnvVars, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function GET() {
  const includeDetails =
    process.env.NODE_ENV !== "production" ||
    process.env.SUPABASE_HEALTH_INCLUDE_DETAILS === "true";

  const missingSupabaseEnvVars = includeDetails ? getMissingSupabaseEnvVars() : undefined;

  return NextResponse.json({
    status: "ok",
    supabaseConfigured: isSupabaseConfigured,
    ...(missingSupabaseEnvVars ? { missingSupabaseEnvVars } : {}),
  });
}

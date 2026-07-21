import { NextResponse } from "next/server";

import { getMissingSupabaseEnvVars, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function GET() {
  const missingSupabaseEnvVars = getMissingSupabaseEnvVars();

  return NextResponse.json({
    status: "ok",
    supabaseConfigured: isSupabaseConfigured,
    missingSupabaseEnvVars,
  });
}

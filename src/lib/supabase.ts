import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import { describeMissingSupabaseEnvVars, isSupabaseConfigured } from './supabaseClient';

export { isSupabaseConfigured, requireSupabaseClient, getMissingSupabaseEnvVars, describeMissingSupabaseEnvVars } from './supabaseClient';

let _browserClient: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase browser client that stores the auth session in
 * cookies instead of localStorage.  This allows Server Components and Route
 * Handlers to read the session via `createSupabaseServerClient()`.
 *
 * Throws if the required environment variables are not set.
 */
export function createSupabaseBrowserClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(describeMissingSupabaseEnvVars());
  }
  if (!_browserClient) {
    _browserClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    ) as SupabaseClient;
  }
  return _browserClient;
}

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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(describeMissingSupabaseEnvVars());
  }
  if (!_browserClient) {
    _browserClient = createBrowserClient(
      supabaseUrl,
      supabaseAnonKey,
    ) as SupabaseClient;
  }
  return _browserClient;
}

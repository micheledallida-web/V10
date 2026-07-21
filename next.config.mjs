const requiredSupabasePublicEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const missingSupabasePublicEnvVars = requiredSupabasePublicEnvVars.filter(
  (key) => !process.env[key],
);

if (missingSupabasePublicEnvVars.length > 0) {
  // eslint-disable-next-line no-console
  console.warn(
    `[startup] Supabase public env vars missing: ${missingSupabasePublicEnvVars.join(", ")}. ` +
      "Authentication will be unavailable until these values are set and the app is redeployed.",
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

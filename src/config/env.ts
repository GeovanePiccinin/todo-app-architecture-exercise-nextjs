import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),

  AUTH_SECRET: z.string(),

  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),

  SUPABASE_SERVICE_ROLE_KEY: z.string(),
});

export const env = envSchema.parse(process.env);

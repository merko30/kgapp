import { camelKeys } from "string-ts";
import { z } from "zod";

const schema = z.object({
  VITE_SUPABASE_URL: z.string().min(1),
  VITE_SUPABASE_KEY: z.string().min(1),
  S3_BUCKET: z.string().min(1),
});

function makeTypedEnv<T>(schema: { parse: (data: unknown) => T }) {
  return (args: Record<string, unknown>) => camelKeys(schema.parse(args));
}

export const getEnvFrom = makeTypedEnv(schema);

export const getEnv = () => {
  if (typeof window !== "undefined") {
    return getEnvFrom(import.meta.env);
  }
  return getEnvFrom(process.env);
};

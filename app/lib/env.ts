import { camelKeys } from "string-ts";
import { z } from "zod";

const schema = z.object({
  SUPABASE_URL: z.string().min(1),
  SUPABASE_KEY: z.string().min(1),
});

function makeTypedEnv<T>(schema: { parse: (data: unknown) => T }) {
  return (args: Record<string, unknown>) => camelKeys(schema.parse(args));
}

export const getEnvFrom = makeTypedEnv(schema);

export const getEnv = () => getEnvFrom(process.env);

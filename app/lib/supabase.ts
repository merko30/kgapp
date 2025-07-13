import { createClient } from "@supabase/supabase-js";
import { getEnv } from "./env";

const supabase = createClient(
  getEnv().viteSupabaseUrl,
  getEnv().viteSupabaseKey
);

export default supabase;

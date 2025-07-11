import { createClient } from "@supabase/supabase-js";
import { getEnv } from "./env";

const supabase = createClient(getEnv().supabaseUrl, getEnv().supabaseKey);

export default supabase;

import type { User } from "@supabase/supabase-js";
import { unstable_createContext } from "react-router";

export const userContext = unstable_createContext<User | null>(null);

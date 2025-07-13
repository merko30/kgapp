import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import supabase from "~/lib/supabase";

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      const response = await supabase.auth.getSession();
      if (!response.error) {
        setSession(session);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  console.log(loading, session);

  return { session, loading };
};

export default useSession;

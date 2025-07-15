import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { createBrowserClient } from "@supabase/ssr";

const useSession = ({
  env: { SUPABASE_URL, SUPABASE_KEY },
}: {
  request: Request;
  env: {
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
  };
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      const client = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
      const response = await client.auth.getSession();
      if (!response.error) {
        setSession(session);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  return { session, loading };
};

export default useSession;

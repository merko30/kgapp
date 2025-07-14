import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

const getServerClient = (request: Request) => {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const headers = new Headers();

  const supabase = createServerClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_KEY!,
    {
      cookies: {
        getAll: () => parseCookieHeader(cookieHeader),
        setAll: (cookies) => {
          for (const cookie of cookies) {
            headers.append(
              "set-cookie",
              serializeCookieHeader(cookie.name, cookie.value, cookie.options)
            );
          }
        },
      },
    }
  );

  return { client: supabase, headers };
};

export default getServerClient;

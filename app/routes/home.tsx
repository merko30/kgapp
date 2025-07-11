import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kupi Global" },
    { name: "description", content: "Logistic Software" },
    {
      name: "keywords",
      content: "logistics, software, kupi, global, delivery, shipping",
    },
  ];
}

export async function loader() {
  const supabase = (await import("~/lib/supabase")).default;
  const response = await supabase.from("pages").select("*");
  return { pages: response?.data || [] };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { pages } = loaderData;
  return <Welcome pages={pages} />;
}

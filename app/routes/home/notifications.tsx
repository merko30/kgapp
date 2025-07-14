import getServerClient from "~/lib/supabase";
import type { Route } from "./+types";

export async function loader({ request }: Route.LoaderArgs) {
  const { client: supabase } = getServerClient(request);
  const response = await supabase
    .from("pages")
    .select("html_content")
    .eq("slug", "notice")
    .single();
  return { html_content: response.data?.html_content || "" };
}

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

export default function NotificationsTab({
  loaderData,
}: {
  loaderData: { html_content: string };
}) {
  return <div dangerouslySetInnerHTML={{ __html: loaderData.html_content }} />;
}

import type { Route } from "../../+types/root";

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
  const response = await supabase
    .from("pages")
    .select("html_content")
    .eq("slug", "notice")
    .single();
  return { html_content: response.data?.html_content || "" };
}

export default function NotificationsTab({
  loaderData,
}: {
  loaderData: { html_content: string };
}) {
  return <div dangerouslySetInnerHTML={{ __html: loaderData.html_content }} />;
}

export async function loader() {
  const supabase = (await import("~/lib//supabase")).default;
  const response = await supabase
    .from("pages")
    .select("html_content")
    .eq("slug", "contact")
    .single();
  return { html_content: response.data?.html_content || "" };
}

export default function ContactTab({
  loaderData,
}: {
  loaderData: { html_content: string };
}) {
  return <div dangerouslySetInnerHTML={{ __html: loaderData.html_content }} />;
}

import { useTranslation } from "react-i18next";
import { Link, Outlet, redirect } from "react-router";
import Login from "~/components/login";
import { Card } from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Route } from "./+types";
import { userContext } from "~/context";
import { getServerClient } from "~/lib/supabase";

const TABS = [
  { value: "/", label: "notifications" },
  { value: "/about-us", label: "aboutUs" },
  { value: "/contact", label: "contact" },
  { value: "/stores", label: "stores" },
  { value: "/legal-information", label: "legalInformation" },
];

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

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { client: supabase } = getServerClient(request);
  const res = await supabase.auth.getUser();

  if (res.data.user) {
    context.set(userContext, res.data.user);
    return redirect("/dashboard");
  }
};

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full container flex flex-col md:flex-row gap-8 md:gap-4">
      <div className="w-full md:w-1/3">
        <Login />
      </div>
      <div className="w-full md:w-2/3">
        <Card className="py-4">
          <Tabs className="px-4">
            <TabsList className="w-full h-auto flex-col md:flex-row">
              {TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} asChild>
                  <Link to={tab.value} className="w-full">
                    {t(tab.label)}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="px-4">
            <Outlet />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;

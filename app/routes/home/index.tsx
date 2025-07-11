import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router";
import Login from "~/components/login";
import { Card } from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Route } from "./+types";
import supabase from "~/lib/supabase";

const TABS = [
  { value: "/", label: "notifications" },
  { value: "/about-us", label: "aboutUs" },
  { value: "/contact", label: "contact" },
  { value: "/stores", label: "stores" },
  { value: "/legal-information", label: "legalInformation" },
];

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email")?.toString();
  let password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      error: "Please provide credentials",
    };
  } else {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("RESPONSE", response);
    if (response.error) {
      return {
        error: "wrongCredentials",
      };
    }
  }
}

const Home = ({ actionData }: Route.ComponentProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full container flex flex-col md:flex-row gap-8 md:gap-4">
      <div className="w-full md:w-1/3">
        <Login data={actionData} />
      </div>
      <div className="w-full md:w-2/3">
        <Card className="py-4">
          <Tabs className="px-4">
            <TabsList className="w-full">
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

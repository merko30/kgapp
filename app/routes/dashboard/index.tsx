import { useTranslation } from "react-i18next";
import { Card, CardHeader } from "~/components/ui/card";

import type { Route } from "./+types";
import getServerClient from "~/lib/supabase";
import { userContext } from "~/context";
import { redirect } from "react-router";

export const unstable_middleware: Route.unstable_MiddlewareFunction[] = [
  async ({ request, context }) => {
    const { client: supabase } = getServerClient(request);
    const res = await supabase.auth.getUser();
    console.log("res", res);

    if (!res.data.user) {
      throw redirect("/");
    }
    context.set(userContext, res.data.user);
  },
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <h1>{t("dashboard")}</h1>
      </CardHeader>
    </Card>
  );
};

export default Dashboard;

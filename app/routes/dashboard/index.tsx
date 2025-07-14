import { useTranslation } from "react-i18next";
import { Card, CardHeader } from "~/components/ui/card";

import type { Route } from "./+types";
import getServerClient from "~/lib/supabase";
import { userContext } from "~/context";
import { redirect } from "react-router";

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { client: supabase } = getServerClient(request);
  const res = await supabase.auth.getUser();

  if (!res.data.user) {
    throw redirect("/");
  }
  context.set(userContext, res.data.user);
};

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

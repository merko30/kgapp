import { useTranslation } from "react-i18next";
import { Card, CardHeader } from "~/components/ui/card";

import type { Route } from "./+types";
import { userContext } from "~/context";
import { redirect } from "react-router";
import { useAuth } from "~/context/Auth";
import { getServerClient } from "~/lib/supabase";

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

  const u = useAuth();

  return (
    <Card>
      <CardHeader>
        <h1>{t("dashboard")}</h1>
      </CardHeader>
    </Card>
  );
};

export default Dashboard;

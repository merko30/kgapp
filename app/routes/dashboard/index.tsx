import { useTranslation } from "react-i18next";
import { Link, redirect } from "react-router";
import {
  Calculator,
  Clipboard,
  History,
  List,
  ListCheck,
  Package,
  Package2,
  PackageCheck,
  ShoppingCart,
  Warehouse,
} from "lucide-react";

import { Card, CardHeader } from "~/components/ui/card";
import type { Route } from "./+types";
import { userContext } from "~/context";
import { getServerClient } from "~/lib/supabase";

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { client: supabase } = getServerClient(request);
  const res = await supabase.auth.getUser();

  if (!res.data.user) {
    throw redirect("/");
  }
  context.set(userContext, res.data.user);
};

const Section = ({
  title,
  items,
}: {
  title: string;
  items: Array<{ icon: React.ReactNode; label: string; link: string }>;
}) => (
  <div className="flex flex-col gap-4 bg-accent/40 pb-4 rounded-sm overflow-hidden">
    <h2 className="text-center text-2xl font-semibold uppercase bg-primary p-4 text-white">
      {title}
    </h2>
    <div className="flex flex-col md:flex-row gap-2">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="flex flex-col items-center justify-center flex-1 gap-4"
        >
          {item.icon}
          <h3 className="text-lg font-medium">{item.label}</h3>
        </Link>
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <h1 className="text-3xl text-center uppercase font-semibold">
            {t("dashboard")}
          </h1>
        </CardHeader>
        <div className="flex p-6 flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 bg-background">user info</div>
          <div className="w-full md:w-2/3 bg-background flex flex-col gap-12">
            <Section
              title="Isporuka"
              items={[
                {
                  icon: <ShoppingCart size={48} />,
                  link: "/shipments",
                  label: "Moje pošiljke",
                },
                {
                  icon: <PackageCheck size={48} />,
                  link: "/shipments",
                  label: "Spremno za slanje",
                },
                {
                  icon: <History size={48} />,
                  link: "/shipments",
                  label: "Historija slanja",
                },
              ]}
            />
            <Section
              title="Rezime naloga"
              items={[
                {
                  icon: <Package2 size={48} />,
                  link: "/orders",
                  label: "Narudžbe u toku",
                },
                {
                  icon: <Warehouse size={48} />,
                  link: "/orders",
                  label: "Artikli na zalihama",
                },
                {
                  icon: <Clipboard size={48} />,
                  link: "/invoices",
                  label: "Računi",
                },
              ]}
            />
            <Section
              title="Narudžbe"
              items={[
                {
                  icon: <List size={48} />,
                  link: "/quotations",
                  label: "Predračuni",
                },
                {
                  icon: <Package size={48} />,
                  link: "/dashboard/orders/pick-up",
                  label: "Preuzimanje narudžbe",
                },
                {
                  icon: <ListCheck size={48} />,
                  link: "/invoices",
                  label: "Prikaz isporuka",
                },
              ]}
            />
            <Section
              title="Podešavanja"
              items={[
                {
                  icon: <Calculator size={48} />,
                  link: "/dashboard/calculator",
                  label: "Kalkulator",
                },
              ]}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;

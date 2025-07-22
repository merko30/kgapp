import { useMemo, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { useTranslation } from "react-i18next";
import { Card } from "~/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "~/components/ui/table";
import { getServerClient } from "~/lib/supabase";
import type { Route } from "./+types";
import { Button } from "~/components/ui/button";

import type { Shipment } from "~/types/shipments";
import { getPublicEnv } from "~/lib/env";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<{ shipments: Shipment[] }> {
  const { client } = getServerClient(request);
  // Get all shipments and join products
  const { data: shipments, error } = await client.from("shipments").select(`
        *,
        products (name, price)
        `);

  return { shipments: shipments ?? [] };
}

export async function action({ request }: ActionFunctionArgs) {
  const { client } = getServerClient(request);

  const formData = await request.formData();
}

const Shipments = ({ loaderData }: Route.ComponentProps) => {
  const { t } = useTranslation();
  const { shipments } = loaderData;
  const [selected, setSelected] = useState<string[]>([]);
  const [showPaypal, setShowPaypal] = useState(false);

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const allSelected =
    shipments.length > 0 && selected.length === shipments.length;
  const handleSelectAll = () => {
    if (allSelected) setSelected([]);
    else setSelected(shipments.map((s) => s.id));
  };

  const value = useMemo(() => {
    return shipments
      .filter((shipment) => selected.includes(shipment.id))
      .reduce((total, shipment) => {
        const productTotal = (shipment.products || []).reduce(
          (productTotal, next) => {
            console.log("price", next.price);
            return productTotal + next.price;
          },
          0
        );
        return total + productTotal;
      }, 0);
  }, [shipments, selected]);

  console.log(value);

  return (
    <Card className="max-w-5xl px-4 mx-auto">
      <h1 className="text-xl font-semibold text-primary">{t("shipments")}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                aria-label={t("selectAll")}
              />
            </TableCell>
            <TableCell>{t("storeName")}</TableCell>
            <TableCell>{t("courierService")}</TableCell>
            <TableCell>{t("trackingNumber")}</TableCell>
            <TableCell>{t("orderDate")}</TableCell>
            <TableCell>{t("weight")}</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments?.map((shipment) => (
            <TableRow
              key={shipment.id}
              className={selected.includes(shipment.id) ? "bg-primary/10" : ""}
            >
              <TableCell>
                <input
                  type="checkbox"
                  checked={selected.includes(shipment.id)}
                  onChange={() => handleSelect(shipment.id)}
                  aria-label={t("selectRow")}
                />
              </TableCell>
              <TableCell>{shipment.store}</TableCell>
              <TableCell>{shipment.shipping_company}</TableCell>
              <TableCell>{shipment.tracking_code}</TableCell>
              <TableCell>{shipment.order_date}</TableCell>
              <TableCell>1kg</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selected.map((id) => (
        <input key={id} type="hidden" name="selected[]" value={id} />
      ))}
      <Button
        disabled={!selected.length && !value}
        type="button"
        className="mt-8"
        onClick={() => setShowPaypal(true)}
      >
        {t("createOrder")}
      </Button>
      {showPaypal && (
        <PayPalScriptProvider
          options={{
            "client-id": getPublicEnv().vitePaypalClientId,
            currency: "USD",
          }}
        >
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
              <h2 className="text-lg font-bold mb-4">{t("payment")}</h2>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  console.log(
                    "Total value for selected shipments:",
                    value.toFixed(2)
                  );

                  // Example: total price is number of selected shipments * 10
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          value: value.toFixed(2),
                          currency_code: "USD",
                        },
                        description: "Payment",
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  if (!actions.order) return;
                  try {
                    const details = await actions.order.capture();
                    setShowPaypal(false);
                    alert(
                      "Payment completed by " +
                        (details?.payer?.name?.given_name ?? "")
                    );
                  } catch (e) {
                    console.log("approve rejected", e);
                  }
                }}
                onCancel={() => setShowPaypal(false)}
                onError={(err) => console.log("error callback", err)}
              />
              <Button
                variant="destructive"
                className="mt-4 w-full"
                onClick={() => setShowPaypal(false)}
              >
                {t("cancel")}
              </Button>
            </div>
          </div>
        </PayPalScriptProvider>
      )}
    </Card>
  );
};

export default Shipments;

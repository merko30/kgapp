import { type LoaderFunctionArgs } from "react-router";
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

import type { Shipment } from "~/types/shipments";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<{ shipments: Shipment[] }> {
  const { client } = getServerClient(request);
  // Get all shipments and join products
  const { data: shipments } = await client
    .from("shipments")
    .select(
      `
        *,
        products (name, price),
        order: orders (id, fulfillment_status, payment_status, transaction_id)
        `
    )
    .not("order_id", "is", null);

  return { shipments: shipments ?? [] };
}

const Shipments = ({ loaderData }: Route.ComponentProps) => {
  const { t } = useTranslation();
  const { shipments } = loaderData;

  return (
    <Card className="max-w-5xl px-4 mx-auto">
      <h1 className="text-xl font-semibold text-primary">{t("history")}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>{t("orderId")}</TableCell>
            <TableCell>{t("storeName")}</TableCell>
            <TableCell>{t("courierService")}</TableCell>
            <TableCell>{t("trackingNumber")}</TableCell>
            <TableCell>{t("orderDate")}</TableCell>
            <TableCell>{t("weight")}</TableCell>
            <TableCell>{t("fulfillmentStatus")}</TableCell>
            <TableCell>{t("paymentStatus")}</TableCell>
            <TableCell>{t("transactionId")}</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments?.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell>{shipment.order?.id ?? "-"}</TableCell>
              <TableCell>{shipment.store}</TableCell>
              <TableCell>{shipment.shipping_company}</TableCell>
              <TableCell>{shipment.tracking_code}</TableCell>
              <TableCell>{shipment.order_date}</TableCell>
              <TableCell>1kg</TableCell>
              <TableCell>
                {shipment.order?.fulfillment_status
                  ? t(shipment.order?.fulfillment_status)
                  : "-"}
              </TableCell>
              <TableCell>
                {shipment.order?.payment_status
                  ? t(shipment.order?.payment_status)
                  : "-"}
              </TableCell>
              <TableCell>{shipment.order?.transaction_id ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default Shipments;

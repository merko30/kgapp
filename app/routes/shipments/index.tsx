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
import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types";

import type { Shipment } from "~/types/shipments";

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

import { useState } from "react";

const Shipments = ({ loaderData }: Route.ComponentProps) => {
  const { t } = useTranslation();
  const { shipments } = loaderData;
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const allSelected = shipments.length > 0 && selected.length === shipments.length;
  const handleSelectAll = () => {
    if (allSelected) setSelected([]);
    else setSelected(shipments.map((s) => s.id));
  };

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
            <TableRow key={shipment.id} className={selected.includes(shipment.id) ? "bg-primary/10" : ""}>
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
    </Card>
  );
};

export default Shipments;

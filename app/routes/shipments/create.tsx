import { useTranslation } from "react-i18next";
import { Form } from "react-router";
import { useState } from "react";

import { Card, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Select } from "../../components/ui/select";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../../components/ui/select";
import { getServerClient } from "~/lib/supabase";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Deklariši pošiljku | Kupi Global" }];
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  // Parse all items as an array
  const items: any[] = [];
  // Find all keys that match items[<index>][field]
  const itemFieldRegex = /^items\[(\d+)\]\[(\w+)\]$/;
  for (const [key, value] of formData.entries()) {
    const match = key.match(itemFieldRegex);
    if (match) {
      const idx = Number(match[1]);
      const field = match[2];
      if (!items[idx]) items[idx] = {};

      // Check if this is a file
      if (value instanceof File && value.size > 0) {
        items[idx][field] = value; // Store the file object
      } else {
        items[idx][field] = value.toString(); // Convert text fields to string
      }
    }
  }

  const store = formData.get("storeName")?.toString();
  const shipping_company = formData.get("courier")?.toString();
  const tracking_code = formData.get("trackingNumber")?.toString();
  const order_date = formData.get("orderDate")?.toString();

  const { client } = getServerClient(request);
  const { data } = await client
    .from("shipments")
    .insert({
      store,
      shipping_company,
      tracking_code,
      order_date,
    })
    .select();

  const shipmentId = data?.[0].id;

  if (!shipmentId) {
    return { success: false, message: "Failed to insert shipment" };
  }

  for await (const item of items) {
    const { data: imageData } = await client.storage
      .from("kupiglobal")
      .upload(
        `/images/${item.name}-${Date.now()}.${item.fileUpload.name
          .split(".")
          .pop()}`,
        item.fileUpload,
        { contentType: item.fileUpload.type }
      );

    const { error } = await client
      .from("products")
      .insert({
        shipment_id: shipmentId,
        name: item.name,
        quantity: parseInt(item.quantity),
        price: item.value,
        image: imageData?.path,
      })
      .select();

    if (error) {
      return {
        success: false,
        message: "Failed to insert products",
      };
    }
  }

  return {
    success: true,
  };
};

const ShipmentCreate = () => {
  const { t } = useTranslation();

  const [items, setItems] = useState([
    {
      id: Date.now(),
      name: "",
      quantity: 1,
      value: 0,
      status: "USA Skladiste",
    },
  ]);

  const onAdd = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        quantity: 1,
        value: 0,
        status: "USA Skladiste",
      },
    ]);
  };

  return (
    <Card className="px-4 max-w-5xl mx-auto">
      <CardTitle>{t("declareShipment")}</CardTitle>
      <Form method="post" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="storeName">{t("storeName")}</Label>
            <Input
              id="storeName"
              name="storeName"
              required
              placeholder={t("storeName")}
            />
          </div>
          <div>
            <Label htmlFor="courier">{t("courierService")}</Label>
            <Input
              id="courier"
              name="courier"
              placeholder={t("courierService")}
            />
          </div>
          <div>
            <Label htmlFor="trackingNumber">{t("trackingNumber")}</Label>
            <Input
              id="trackingNumber"
              name="trackingNumber"
              required
              placeholder={t("trackingNumber")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="orderDate">{t("orderDate")}</Label>
            <Input
              id="orderDate"
              name="orderDate"
              type="date"
              required
              placeholder={t("orderDate")}
            />
          </div>
          <div>
            <Label htmlFor="destinationCountry">
              {t("destinationCountry")}
            </Label>
            <Select
              name="destinationCountry"
              required
              defaultValue="Bosnia and Herzegovina"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("destinationCountry")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("destinationCountry")}</SelectLabel>
                  <SelectItem value="Bosnia and Herzegovina">
                    Bosnia and Herzegovina
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="w-full flex flex-col md:flex-row md:items-end gap-4 mb-4">
              <div>
                <Label htmlFor={`itemName-${index}`}>{t("itemName")}</Label>
                <Input
                  id={`itemName-${index}`}
                  name={`items[${index}][name]`}
                  required
                  placeholder={t("itemName")}
                />
              </div>
              <div>
                <Label htmlFor={`quantity-${index}`}>{t("quantity")}</Label>
                <Input
                  id={`quantity-${index}`}
                  name={`items[${index}][quantity]`}
                  type="number"
                  required
                  min={1}
                  defaultValue={1}
                  placeholder={t("quantity")}
                />
              </div>
              <div>
                <Label htmlFor={`itemValue-${index}`}>
                  {t("itemValueUSD")}
                </Label>
                <Input
                  id={`itemValue-${index}`}
                  name={`items[${index}][value]`}
                  type="number"
                  required
                  placeholder={t("itemValueUSD")}
                />
              </div>
              <div>
                <Label htmlFor={`declaredValue-${index}`}>
                  {t("declaredValueUSD")}
                </Label>
                <Input
                  id={`declaredValue-${index}`}
                  name={`items[${index}][declaredValue]`}
                  type="number"
                  required
                  placeholder={t("declaredValueUSD")}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor={`itemStatus-${index}`}>{t("itemStatus")}</Label>
                <Select
                  name={`items[${index}][status]`}
                  required
                  defaultValue="USA Skladiste"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("itemStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("itemStatus")}</SelectLabel>
                      <SelectItem value="USA Skladiste">
                        USA Skladiste
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor={`fileUpload-${index}`}>{t("receipt")}*</Label>
              <Input
                id={`fileUpload-${index}`}
                name={`items[${index}][fileUpload]`}
                type="file"
                accept=".png,.jpg,.jpeg,.gif,.pdf"
                required
              />
              <small>{t("uploadHelp")}</small>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 mb-4">
          <div className="border border-primary rounded px-4 py-2">
            {t("totalItems")}: {items.length}
          </div>
          <Button
            onClick={onAdd}
            type="button"
            variant="default"
            className="py-5"
          >
            +
          </Button>
          <Button type="button" variant="destructive" className="py-5">
            x
          </Button>
        </div>
        <div className="flex gap-4">
          <Button type="reset" variant="destructive">
            {t("reset")}
          </Button>
          <Button type="submit" variant="default">
            {t("confirm")}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default ShipmentCreate;

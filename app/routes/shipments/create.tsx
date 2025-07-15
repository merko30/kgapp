import { useTranslation } from "react-i18next";
import { Form } from "react-router";
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

const ShipmentCreate = () => {
  const { t } = useTranslation();

  return (
    <Card className="px-4 max-w-4xl mx-auto">
      <CardTitle>{t("declareShipment")}</CardTitle>
      <Form method="post">
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div>
            <Label htmlFor="itemName">{t("itemName")}</Label>
            <Input
              id="itemName"
              name="itemName"
              required
              placeholder={t("itemName")}
            />
          </div>
          <div>
            <Label htmlFor="quantity">{t("quantity")}</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              required
              min={1}
              defaultValue={1}
              placeholder={t("quantity")}
            />
          </div>
          <div>
            <Label htmlFor="itemValue">{t("itemValueUSD")}</Label>
            <Input
              id="itemValue"
              name="itemValue"
              type="number"
              required
              placeholder={t("itemValueUSD")}
            />
          </div>
          <div>
            <Label htmlFor="declaredValue">{t("declaredValueUSD")}</Label>
            <Input
              id="declaredValue"
              name="declaredValue"
              type="number"
              required
              placeholder={t("declaredValueUSD")}
            />
          </div>
          <div>
            <Label htmlFor="itemStatus">{t("itemStatus")}</Label>
            <Select name="itemStatus" required defaultValue="USA Skladiste">
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("itemStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("itemStatus")}</SelectLabel>
                  <SelectItem value="USA Skladiste">USA Skladiste</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="fileUpload">*</Label>
          <Input
            id="fileUpload"
            name="fileUpload"
            type="file"
            accept=".png,.jpg,.jpeg,.gif,.pdf"
            required
          />
          <small>{t("uploadHelp")}</small>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-200 rounded px-4 py-2">
            {t("totalItems")}: 1
          </div>
          <Button type="button" variant="secondary">
            +
          </Button>
          <Button type="button" variant="destructive">
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

import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

import HomeInfo from "./info";

export function Welcome({
  pages,
}: {
  pages?: any; // Adjust type as necessary
}) {
  const { t } = useTranslation();
  return (
    <div className="w-full container flex flex-col md:flex-row gap-8 md:gap-4">
      <div className="w-full md:w-1/3">
        <Card className="px-4">
          <Input placeholder={t("emailID/userID")} />
          <Input placeholder={t("password")} />
          <Button>{t("login")}</Button>
        </Card>
      </div>
      <div className="w-full md:w-2/3">
        <HomeInfo data={pages} />
      </div>
    </div>
  );
}

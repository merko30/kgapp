import { useTranslation } from "react-i18next";
import { Card, CardHeader } from "~/components/ui/card";

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

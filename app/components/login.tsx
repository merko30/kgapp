import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

const Login = () => {
  const { t } = useTranslation();

  return (
    <Card className="px-4">
      <Input placeholder={t("emailID/userID")} />
      <Input placeholder={t("password")} />
      <Button>{t("login")}</Button>
    </Card>
  );
};

export default Login;

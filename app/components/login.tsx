import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Form } from "react-router";
import { Alert } from "./ui/alert";

const Login = ({
  data,
}: {
  data?: {
    error?: string;
  };
}) => {
  const { t } = useTranslation();

  return (
    <Card className="px-4">
      <Form method="post">
        {data?.error && (
          <Alert variant="destructive" className="mb-4 text-nowrap">
            {t(data.error ?? "wrongCredentials")}
          </Alert>
        )}
        <Input
          name="email"
          type="email"
          required
          placeholder={t("emailID")}
          className="mb-4"
        />
        <Input
          name="password"
          type="password"
          required
          min={8}
          placeholder={t("password")}
          className="mb-4"
        />
        <Button type="submit">{t("login")}</Button>
      </Form>
    </Card>
  );
};

export default Login;

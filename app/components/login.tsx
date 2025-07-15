import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Form, redirect } from "react-router";
import { Alert } from "./ui/alert";
import { useState } from "react";
import { supabase } from "~/lib/supabase";

const Login = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!email || !password) {
      return {
        error: "Please provide credentials",
      };
    }

    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (response.error) {
      return {
        error: "wrongCredentials",
      };
    } else if (response.data.user) {
      return redirect("/dashboard");
    } else {
      return {
        error: "unknownError",
      };
    }
  };

  return (
    <Card className="px-4">
      <Form onSubmit={handleLogin}>
        {error && (
          <Alert variant="destructive" className="mb-4 text-nowrap">
            {t(error ?? "wrongCredentials")}
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

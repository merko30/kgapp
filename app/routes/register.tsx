import { useTranslation } from "react-i18next";
import { Form, redirect } from "react-router";
import { Card, CardTitle } from "../components/ui/card";
import type { Route } from "../+types/root";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select } from "~/components/ui/select";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../components/ui/select";
import { getServerClient } from "~/lib/supabase";

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email")?.toString();
  let password = formData.get("password")?.toString();
  let phone = formData.get("phone")?.toString();
  let firstName = formData.get("firstName")?.toString();
  let lastName = formData.get("lastName")?.toString();
  let address1 = formData.get("address1")?.toString();
  let address2 = formData.get("address2")?.toString();
  let city = formData.get("city")?.toString();
  let postalCode = formData.get("postalCode")?.toString();
  let country = formData.get("country")?.toString();
  let accountType = formData.get("accountType")?.toString();

  const data = {
    firstName,
    lastName,
    email,
    phone,
    address1,
    address2,
    city,
    postalCode,
    country,
    accountType,
  };

  if (!email || !password) {
    return {
      error: "Please provide credentials",
    };
  } else {
    const supabase = getServerClient(request).client;
    const response = await supabase.auth.signUp({
      options: { data },
      email,
      password,
    });

    if (response.error) {
      return {
        error: "wrongCredentials",
      };
    } else {
      return redirect("/dashboard");
    }
  }
}

const Register = () => {
  const { t } = useTranslation();

  return (
    <Card className="px-4 max-w-3xl mx-auto">
      <CardTitle>{t("memberRegistration")}</CardTitle>
      <Form method="post">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <Label>{t("accountType")}</Label>
            <Select name="accountType" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("accountType")} className="py-2" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("accountType")}</SelectLabel>
                  <SelectItem value="INDIVIDUAL">{t("individual")}</SelectItem>
                  <SelectItem value="BUSINESS">{t("business")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label htmlFor="firstName">{t("firstName")}</Label>
            <Input
              id="firstName"
              name="firstName"
              required
              placeholder={t("firstName")}
            />
            <Label htmlFor="lastName">{t("lastName")}</Label>
            <Input
              id="lastName"
              name="lastName"
              required
              placeholder={t("lastName")}
            />
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t("email")}
            />
            <Label>{t("gender")}</Label>
            <div className="flex gap-4 mb-2">
              <Label htmlFor="gender-male" className="flex items-center gap-2">
                <input
                  id="gender-male"
                  type="radio"
                  name="gender"
                  value="Male"
                  required
                />
                {t("male")}
              </Label>
              <Label
                htmlFor="gender-female"
                className="flex items-center gap-2"
              >
                <input
                  id="gender-female"
                  type="radio"
                  name="gender"
                  value="Female"
                  required
                />
                {t("female")}
              </Label>
            </div>
            <Label htmlFor="profileImage">{t("profileImage")}</Label>
            <Input
              id="profileImage"
              name="profileImage"
              type="file"
              accept=".png,.jpg,.jpeg,.gif"
              className="mb-2"
            />
            <small>{t("uploadImageHelp")}</small>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <Label htmlFor="address1">{t("address1")}</Label>
            <Input
              id="address1"
              name="address1"
              required
              placeholder={t("address1")}
            />
            <Label htmlFor="address2">{t("address2")}</Label>
            <Input id="address2" name="address2" placeholder={t("address2")} />
            <Label>{t("country")}</Label>
            <Select
              name="country"
              required
              disabled
              defaultValue="Bosna i Hercegovina"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("country")} className="py-2" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("country")}</SelectLabel>
                  <SelectItem value="Bosna i Hercegovina">
                    Bosna i Hercegovina
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label htmlFor="city">{t("citySelect")}</Label>
            <Input id="city" name="city" placeholder={t("citySelect")} />
            <Label htmlFor="postalCode">{t("postalCode")}</Label>
            <Input
              id="postalCode"
              name="postalCode"
              placeholder={t("postalCode")}
            />
            <div>
              <Label htmlFor="phone" className="mb-4">
                {t("phoneNumber")}
              </Label>
              <Input
                id="phone"
                name="phone"
                required
                placeholder={t("phoneNumber")}
                pattern="^\+387[0-9]{8,9}$"
                title={t("bosniaHerzegovinaCode")}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Label htmlFor="password" className="mb-4">
              {t("password")}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              min={8}
              placeholder={t("password")}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="confirmPassword" className="mb-4">
              {t("confirmPassword")}
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              min={8}
              placeholder={t("confirmPassword")}
            />
          </div>
        </div>

        <div className="mb-4">
          <label>
            <input type="checkbox" name="acceptTerms" required />{" "}
            {t("acceptTerms")}
          </label>
        </div>
        <Button type="submit">{t("register")}</Button>
      </Form>
    </Card>
  );
};

export default Register;

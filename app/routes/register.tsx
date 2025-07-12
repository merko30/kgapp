import { useTranslation } from "react-i18next";
import { Form } from "react-router";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Register = () => {
  const { t } = useTranslation();

  return (
    <Card className="px-4">
      <Form method="post">
        <h2 className="text-xl font-bold mb-4">{t("memberRegistration")}</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div>
              <label className="block mb-1">{t("accountType")}</label>
              <select
                name="accountType"
                required
                className="w-full border border-gray-50"
              >
                <option value="INDIVIDUAL">INDIVIDUAL</option>
              </select>
            </div>
            <Input name="firstName" required placeholder={t("firstName")} />
            <Input name="lastName" required placeholder={t("lastName")} />
            <Input
              name="email"
              type="email"
              required
              placeholder={t("email")}
            />
            <div>
              <label className="block mb-1">{t("gender")}</label>
              <label className="mr-2">
                <input type="radio" name="gender" value="Male" required />{" "}
                {t("male")}
              </label>
              <label>
                <input type="radio" name="gender" value="Female" required />{" "}
                {t("female")}
              </label>
            </div>
            <div>
              <label className="block mb-1">{t("profileImage")}</label>
              <Input
                name="profileImage"
                type="file"
                accept=".png,.jpg,.jpeg,.gif"
                className="mb-2"
              />
              <small>{t("uploadImageHelp")}</small>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <Input name="address1" required placeholder={t("address1")} />
            <Input name="address2" placeholder={t("address2")} />
            <Input
              name="country"
              required
              placeholder={t("country")}
              defaultValue="Bosnia and Herzegovina"
            />
            <Input
              name="state"
              required
              placeholder={t("state")}
              defaultValue="Bosnia and Herzegovina"
            />
            <Input name="city" placeholder={t("citySelect")} />
            <Input name="postalCode" placeholder={t("postalCode")} />
            <div>
              <label className="block mb-1">{t("bosniaHerzegovinaCode")}</label>
              <Input name="phone" required placeholder={t("phoneNumber")} />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            name="password"
            type="password"
            required
            min={8}
            placeholder={t("password")}
          />
          <Input
            name="confirmPassword"
            type="password"
            required
            min={8}
            placeholder={t("confirmPassword")}
          />
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

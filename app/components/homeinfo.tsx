import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "./ui/tabs";

const HomeInfo = () => {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="notifications" className="w-full flex-col">
      <TabsList className="w-full flex-col md:flex-row h-auto">
        <TabsTrigger value="notifications" className="w-full">
          {t("notifications")}
        </TabsTrigger>
        <TabsTrigger value="about-us" className="w-full">
          {t("aboutUs")}
        </TabsTrigger>
        <TabsTrigger value="contact" className="w-full">
          {t("contact")}
        </TabsTrigger>
        <TabsTrigger value="stores" className="w-full">
          {t("stores")}
        </TabsTrigger>
        <TabsTrigger value="legal-information" className="w-full">
          {t("legalInformation")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="notifications">
        <p>Account content goes here.</p>
      </TabsContent>
      <TabsContent value="about-us">
        <p>About Us content goes here.</p>
      </TabsContent>
      <TabsContent value="contact">
        <p>Contact content goes here.</p>
      </TabsContent>
      <TabsContent value="stores">
        <p>Stores content goes here.</p>
      </TabsContent>
      <TabsContent value="legal-information">
        <p>Legal Information content goes here.</p>
      </TabsContent>
    </Tabs>
  );
};

export default HomeInfo;

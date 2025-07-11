import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "../components/ui/tabs";
import { Card } from "~/components/ui/card";

const TABS = [
  { value: "notifications", label: "notifications" },
  { value: "about-us", label: "aboutUs" },
  { value: "contact", label: "contact" },
  { value: "stores", label: "stores" },
  { value: "legal-information", label: "legalInformation" },
];

const Info = ({ data }: { data: { slug: string; html_content: string }[] }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("notifications");

  const noticeContent =
    data.find((page) => page.slug === "notice")?.html_content || "";
  const aboutUsContent =
    data.find((page) => page.slug === "about-us")?.html_content || "";
  const contactContent =
    data.find((page) => page.slug === "contact")?.html_content || "";
  const storesContent =
    data.find((page) => page.slug === "stores")?.html_content || "";
  const legalInfoContent =
    data.find((page) => page.slug === "legal-information")?.html_content || "";

  return (
    <Card className="py-4">
      <Tabs
        defaultValue="notifications"
        className="w-full flex-col bg-background px-4 py-0"
      >
        <TabsList className="w-full flex-col md:flex-row h-auto">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="w-full"
            >
              {t(tab.label)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="notifications">
          <div dangerouslySetInnerHTML={{ __html: data[0].html_content }} />
        </TabsContent>
        <TabsContent value="about-us">
          <div dangerouslySetInnerHTML={{ __html: aboutUsContent }} />
        </TabsContent>
        <TabsContent value="contact">
          <div dangerouslySetInnerHTML={{ __html: contactContent }} />
        </TabsContent>
        <TabsContent value="stores">//</TabsContent>
        <TabsContent value="legal-information">
          <div dangerouslySetInnerHTML={{ __html: legalInfoContent }} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default Info;

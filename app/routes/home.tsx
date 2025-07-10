import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kupi Global" },
    { name: "description", content: "Logistic Software" },
    {
      name: "keywords",
      content: "logistics, software, kupi, global, delivery, shipping",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}

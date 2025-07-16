import { Outlet } from "react-router";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pošiljke | Kupi Global" }];
}

const Shipments = () => (
  <div>
    <Outlet />
  </div>
);

export default Shipments;

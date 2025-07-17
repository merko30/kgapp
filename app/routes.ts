import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home/index.tsx", [
    index("routes/home/notifications.tsx"),
    route("about-us", "routes/home/about-us.tsx"),
    route("contact", "routes/home/contact.tsx"),
    route("stores", "routes/home/stores.tsx"),
    route("legal-information", "routes/home/legal-information.tsx"),
  ]),
  route("/dashboard", "routes/dashboard/index.tsx", [
    route("orders", "routes/dashboard/orders.tsx"),
    route("packages", "routes/dashboard/packages.tsx"),
    route("history", "routes/dashboard/history.tsx"),
    route("invoices", "routes/dashboard/invoices.tsx"),
  ]),
  route("/shipments", "routes/shipments/root.tsx", [
    index("routes/shipments/index.tsx"),
    route("create", "routes/shipments/create.tsx"),
  ]),
  route("/register", "routes/register.tsx"),
] satisfies RouteConfig;

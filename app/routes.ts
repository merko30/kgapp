import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home/index.tsx", [
    index("routes/home/notifications.tsx"),
    route("about-us", "routes/home/about-us.tsx"),
    route("contact", "routes/home/contact.tsx"),
    route("stores", "routes/home/stores.tsx"),
    route("legal-information", "routes/home/legal-information.tsx"),
  ]),
] satisfies RouteConfig;

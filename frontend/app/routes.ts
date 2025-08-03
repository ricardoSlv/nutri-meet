import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/nutritionist-search", "routes/nutritionist-search.tsx"),
  route("/pending-appointment-requests", "routes/pending-appointment-requests.tsx"),
] satisfies RouteConfig;

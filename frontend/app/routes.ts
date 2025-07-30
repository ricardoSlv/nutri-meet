import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/scheduling", "routes/scheduling.tsx"),
  route("/nutritionists", "routes/nutritionists.tsx"),
] satisfies RouteConfig;

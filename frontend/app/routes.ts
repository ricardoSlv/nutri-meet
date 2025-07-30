import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/scheduling", "routes/scheduling.tsx"),
  route("/nutritionists", "routes/nutritionists.tsx"),
] satisfies RouteConfig;

//   https://cdn-icons-png.flaticon.com/512/3135/3135715.png
//   https://cdn-icons-png.flaticon.com/512/4140/4140037.png
//   https://cdn-icons-png.flaticon.com/512/2202/2202112.png
//   https://cdn-icons-png.flaticon.com/512/6997/6997662.png
//   https://cdn-icons-png.flaticon.com/512/4140/4140047.png

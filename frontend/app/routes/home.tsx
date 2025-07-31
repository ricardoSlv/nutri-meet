import type { Route } from "./+types/home";
import NutritionistSearch from "./nutritionist-search";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Scheduling Page" }, { name: "description", content: "Meet your nutritionist!" }];
}

export default function Home() {
  return <NutritionistSearch />;
}

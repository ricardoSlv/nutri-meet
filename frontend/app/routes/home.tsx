import type { Route } from "./+types/home";
import Scheduling from "./scheduling";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Scheduling Page" }, { name: "description", content: "Meet your nutritionist!" }];
}

export default function Home() {
  return <Scheduling />;
}

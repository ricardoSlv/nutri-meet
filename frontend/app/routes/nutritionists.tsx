import useNutritionists from "~/hooks/queries/useNutritionists";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "~/components/ui/select";
import type { Nutritionist } from "~/types/Nutricionist";

import { Link } from "react-router";
import { FaExternalLinkAlt } from "react-icons/fa";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Scheduling Page" }, { name: "description", content: "Meet your nutritionist!" }];
}

export default function nutritionists() {
  const { data: nutritionistsResult, isLoading, error } = useNutritionists("");

  return (
    <nav className="flex items-center justify-center w-full flex-col ">
      <div className="bg-green-300 w-full py-4 px-8 shadow-2xl flex items-center justify-between ">
        <h1 className="text-2xl font-bold ">Nutritionists</h1>

        <Button variant="link" className="">
          <Link to="/scheduling" className="text-blue-500 flex flex-row items-center gap-2">
            Scheduling <FaExternalLinkAlt />
          </Link>
        </Button>
        <Button variant="link" className="">
          <Link to="/nutritionists" className="text-blue-500 flex flex-row items-center gap-2">
            Nutritionists Page
            <FaExternalLinkAlt />
          </Link>
        </Button>
      </div>
      <div className="w-full py-8 bg-green-500 shadow-lg">
        <Select>
          <SelectTrigger className="w-full bg-white shadow-lg rounded-xs">
            <SelectValue placeholder="Select a nutritionist" />
            <SelectContent>
              {nutritionistsResult?.nutritionists.map((nutritionist: Nutritionist) => (
                <SelectItem key={nutritionist.id} value={nutritionist.id.toString()}>
                  {nutritionist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>
    </nav>
  );
}

import { useQuery } from "@tanstack/react-query";
import { backendUrl } from "~/config/backend";

export default function useNutritionists(querySearch: string) {
  return useQuery({
    queryKey: ["nutritionists", querySearch],
    queryFn: () => fetch(`${backendUrl}/nutritionists?search=${querySearch}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
    // enabled: !!querySearch,
  });
}

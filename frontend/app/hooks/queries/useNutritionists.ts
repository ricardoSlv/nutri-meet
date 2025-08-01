import { useQuery } from "@tanstack/react-query";
import { backendUrl } from "~/config/backend";

export type NutritionistSearchParams = {
  searchQuery: string;
  location_id: string;
};

export function useNutritionists(params: NutritionistSearchParams) {
  const searchParams = new URLSearchParams();

  if (!!params.searchQuery) {
    searchParams.set("search", params.searchQuery);
  }
  if (!!params.location_id) {
    searchParams.set("location_id", params.location_id);
  }

  return useQuery({
    queryKey: ["nutritionists", params.searchQuery, params.location_id],
    queryFn: () => fetch(`${backendUrl}/nutritionists?${searchParams.toString()}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });
}

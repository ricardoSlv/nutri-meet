import { useNutritionists } from "./useNutritionists";
import { useEffect, useMemo, useState } from "react";

export type PaginatedNutritionistSearchParams = {
  searchQuery: string;
  location_id: string;
  limit: number;
};

export function usePaginatedNutritionistSearchResult(params: PaginatedNutritionistSearchParams) {
  const [page, setPage] = useState(0);

  const nutritionistsQueryResult = useNutritionists({
    searchQuery: params.searchQuery,
    location_id: params.location_id,
  });

  const unwrappedNutritionists = useMemo(() => {
    return nutritionistsQueryResult.data?.nutritionists?.flatMap((nutritionist) =>
      nutritionist.services.map((service) => ({
        ...nutritionist,
        services: [service],
      }))
    );
  }, [nutritionistsQueryResult.data, page, params.limit]);

  useEffect(() => {
    setPage(0);
  }, [params.searchQuery, params.location_id]);

  return {
    ...nutritionistsQueryResult,
    data: unwrappedNutritionists?.slice(page * params.limit, (page + 1) * params.limit),
    page,
    setPage,
    totalPages: Math.ceil((unwrappedNutritionists?.length ?? 0) / params.limit),
  };
}

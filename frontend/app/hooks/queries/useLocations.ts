import { useQuery } from "@tanstack/react-query";
import { backendUrl } from "~/config/backend";

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => fetch(`${backendUrl}/locations`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });
}

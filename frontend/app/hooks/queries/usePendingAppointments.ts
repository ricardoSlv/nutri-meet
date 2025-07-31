import { useQuery } from "@tanstack/react-query";
import { backendUrl } from "~/config/backend";

export function usePendingAppointments(nutritionistId: string) {
  return useQuery({
    queryKey: ["pending-appointments", nutritionistId],
    queryFn: () =>
      fetch(`${backendUrl}/appointments?status=pending&nutritionist_id=${nutritionistId}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
    enabled: !!nutritionistId,
  });
}

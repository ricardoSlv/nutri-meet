import { useQuery } from "@tanstack/react-query";
import { backendUrl } from "~/config/backend";

export default function useAppointments(nutritionistId: string) {
  return useQuery({
    queryKey: ["appointments", nutritionistId],
    queryFn: () => fetch(`${backendUrl}/appointments?nutritionist_id=${nutritionistId}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
    enabled: !!nutritionistId,
  });
}

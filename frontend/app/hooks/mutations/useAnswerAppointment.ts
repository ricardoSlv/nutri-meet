import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendUrl } from "~/config/backend";
import type { AnswerAppointmentDTO } from "~/types/Appointment";

export default function useAnswerAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AnswerAppointmentDTO) => {
      const res = await fetch(`${backendUrl}/appointments/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: data.status,
        }),
      });
      if (!res.ok) throw Error("Failed to answer appointment");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-appointments"] });
    },
  });
}

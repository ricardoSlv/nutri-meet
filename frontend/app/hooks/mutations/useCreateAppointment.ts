import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendUrl } from "~/config/backend";
import type { CreateAppointmentDTO } from "~/types/Appointment";

export default function useCreateAppointment() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAppointmentDTO) => {
      const res = await fetch(`${backendUrl}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let error;
        try {
          error = await res.json();
        } catch (error) {
          throw new Error("Failed to schedule appointment");
        }
        throw new Error(error?.errors?.datetime || "Failed to schedule appointment");
      }

      client.invalidateQueries({ queryKey: ["pending-appointments", data.nutritionist_id.toString()] });
      return await res.json();
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { backendUrl } from "~/config/backend";
import type { CreateAppointmentDTO } from "~/types/Appointment";

export default function useCreateAppointment() {
  return useMutation({
    mutationFn: async (data: CreateAppointmentDTO) => {
      const res = await fetch(`${backendUrl}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw Error("Failed to schedule appointment");
      return await res.json();
    },
  });
}

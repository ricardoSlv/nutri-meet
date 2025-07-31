import type { Service } from "./Service";

export type Appointment = {
  id: string;
  guest_name: string;
  guest_email: string;
  datetime: string;
  nutritionist_id: number;
  service_id: number;
  service: Service;
  status: "pending" | "accepted" | "rejected";
};

export type CreateAppointmentDTO = Pick<
  Appointment,
  "guest_name" | "guest_email" | "datetime" | "nutritionist_id" | "service_id"
>;

export type AnswerAppointmentDTO = Pick<Appointment, "id" | "status">;

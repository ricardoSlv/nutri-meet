import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "~/components/ui/select";
import type { Nutritionist } from "~/types/Nutricionist";

import type { Route } from "./+types/home";
import Navbar from "~/components/layout/Navbar";
import { useNutritionists } from "~/hooks/queries/useNutritionists";
import { useState } from "react";
import type { Appointment } from "~/types/Appointment";
import AppointmentCard from "~/components/appointments/AppointmentCard";
import AnswerAppointmentModal from "~/components/appointments/AnswerAppointmentModal";
import { usePendingAppointments } from "~/hooks/queries/usePendingAppointments";
import { useTranslation } from "react-i18next";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Scheduling Page" }, { name: "description", content: "Meet your nutritionist!" }];
}

export default function PendingAppointmentRequests() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const { data: nutritionistsResult, isLoading, error } = useNutritionists({ searchQuery: "", location_id: "" });
  const [nutricionistId, setNutricionistId] = useState<string>("");

  const {
    data: appointmentsResult,
    isLoading: isLoadingAppointments,
    error: errorAppointments,
  } = usePendingAppointments(nutricionistId);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="w-full py-10 bg-linear-to-r from-emerald-500 to-emerald-600 shadow-2xl">
        <div className="flex items-center justify-center w-full max-w-screen-lg mx-auto gap-4">
          <Select onValueChange={(v) => setNutricionistId(v)}>
            <SelectTrigger className="w-full bg-white shadow-lg rounded-xs">
              <SelectValue placeholder={t("selectANutritionistToViewTheirAppointments")} />
              <SelectContent>
                {nutritionistsResult?.nutritionists.map((nutritionist: Nutritionist) => (
                  <SelectItem key={nutritionist.id} value={nutritionist.id.toString()}>
                    {nutritionist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectTrigger>
          </Select>
        </div>
      </div>

      <main className="w-full flex-grow-1 bg-gray-200 flex-wrap gap-4">
        <div className="grid grid-cols-4 gap-4 max-w-screen-xl items-center justify-start pt-8 pb-4  mx-auto">
          {appointmentsResult?.appointments.map((appointment: Appointment) => (
            <div key={appointment.id}>
              <AppointmentCard
                appointment={appointment}
                onAnswerAppointment={() => {
                  setAppointment(appointment);
                  setOpen(true);
                }}
              />
            </div>
          ))}
        </div>
        {appointment && (
          <AnswerAppointmentModal
            key={`${nutricionistId}-${appointment?.id}`}
            open={open}
            setOpen={setOpen}
            appointment={appointment!}
          />
        )}
      </main>
    </div>
  );
}

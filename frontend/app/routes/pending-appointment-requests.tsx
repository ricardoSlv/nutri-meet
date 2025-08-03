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
import { Button } from "~/components/ui/button";
import { TbRefresh } from "react-icons/tb";
import { FaLink } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        <div className=" max-w-screen-xl items-center justify-start py-4 px-6 mx-auto bg-white m-4 rounded-xs shadow-xl">
          <div className="flex flex-row items-center justify-between mb-4">
            <div className="flex flex-col ">
              <h1 className="text-lg text-gray-600">{t("pendingAppointments")}</h1>
              <p className="text-sm text-gray-600">{t("acceptOrRejectPendingRequests")}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="outline" className="h-6 w-8 rounded-xs">
                <ChevronLeft />
              </Button>
              <Button variant="outline" className="h-6 w-8 rounded-xs">
                <ChevronRight />
              </Button>
              <Button variant="outline" className="h-6 w-8 rounded-xs">
                <FaLink />
              </Button>
              <Button variant="outline" className="h-6 w-8 rounded-xs">
                <TbRefresh />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 self-stretch">
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

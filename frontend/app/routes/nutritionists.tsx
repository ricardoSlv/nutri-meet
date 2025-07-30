import useNutritionists from "~/hooks/queries/useNutritionists";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "~/components/ui/select";
import type { Nutritionist } from "~/types/Nutricionist";

import { Link } from "react-router";
import { FaExternalLinkAlt } from "react-icons/fa";
import type { Route } from "./+types/home";
import Navbar from "~/components/layout/Navbar";
import useAppointments from "~/hooks/queries/useAppointments";
import { useState } from "react";
import type { Appointment } from "~/types/Appointment";
import AppointmentCard from "~/components/appointments/AppointmentCard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Scheduling Page" }, { name: "description", content: "Meet your nutritionist!" }];
}

export default function nutritionists() {
  const { data: nutritionistsResult, isLoading, error } = useNutritionists("");
  const [nutricionistId, setNutricionistId] = useState<string>("");

  const {
    data: appointmentsResult,
    isLoading: isLoadingAppointments,
    error: errorAppointments,
  } = useAppointments(nutricionistId);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="w-full py-10 bg-linear-to-r from-emerald-500 to-emerald-600 shadow-2xl">
        <div className="flex items-center justify-center w-full max-w-screen-lg mx-auto gap-4">
          <Select onValueChange={(v) => setNutricionistId(v)}>
            <SelectTrigger className="w-full bg-white shadow-lg rounded-xs">
              <SelectValue placeholder="Select a nutritionist to view their appointments" />
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
              <AppointmentCard appointment={appointment} onAnswerAppointment={() => {}} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

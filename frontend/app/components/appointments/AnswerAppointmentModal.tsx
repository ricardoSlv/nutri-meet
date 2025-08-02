import { LuLoaderCircle } from "react-icons/lu";
import { useState, type SyntheticEvent } from "react";
import type { Nutritionist } from "~/types/Nutricionist";
import type { Service } from "~/types/Service";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { DateTimePicker } from "~/components/ui/DateTimePicker";
import useCreateAppointment from "~/hooks/mutations/useCreateAppointment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "~/components/ui/dialog";
import useAnswerAppointment from "~/hooks/mutations/useAnswerAppointment";
import type { Appointment } from "~/types/Appointment";
import { FaRegClock } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function AnswerAppointmentModal({
  open,
  setOpen,
  appointment,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  appointment: Appointment;
}) {
  const { t } = useTranslation();

  const { mutate: answerAppointment, status } = useAnswerAppointment();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-emerald-500">
            {t("answerGuestRequest", { name: appointment.guest_name })}
          </DialogTitle>
          <DialogDescription className="-mt-2 mb-2">
            <p>{appointment.service.name}</p>
          </DialogDescription>

          <div className="flex flex-col gap-2 items-start">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <IoMdCalendar className="text-emerald-500" />

              {new Date(appointment.datetime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FaRegClock className="text-emerald-500" />

              {new Date(appointment.datetime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>

          <DialogFooter>
            {status === "success" && (
              <p className="w-full self-center text-center text-sm text-green-500">
                {t("appointmentScheduledSuccessfully")}
              </p>
            )}
            {status === "error" && (
              <p className="w-full self-center text-center text-sm text-red-500">
                {t("errorAnsweringRequestPleaseTryAgain")}
              </p>
            )}

            <Button
              className="min-w-24 bg-orange-700/30 hover:bg-orange-800/30 text-orange-700 cursor-pointer rounded-xs"
              disabled={status === "pending" || status === "success"}
              onClick={() => answerAppointment({ id: appointment.id, status: "rejected" })}
            >
              {t("reject")}
            </Button>

            <Button
              className="min-w-24 bg-emerald-500/30 hover:bg-emerald-600/30 text-emerald-500 rounded-xs cursor-pointer"
              disabled={status === "pending" || status === "success"}
              onClick={() => answerAppointment({ id: appointment.id, status: "accepted" })}
            >
              {status === "pending" ? <LuLoaderCircle className="animate-spin" /> : t("accept")}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

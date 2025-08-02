import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "~/components/ui/alert-dialog";
import { LuLoaderCircle } from "react-icons/lu";
import { useState, type SyntheticEvent } from "react";
import type { Nutritionist } from "~/types/Nutricionist";
import type { Service } from "~/types/Service";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { DateTimePicker } from "~/components/ui/DateTimePicker";
import useCreateAppointment from "~/hooks/mutations/useCreateAppointment";
import { useTranslation } from "react-i18next";

export default function ScheduleAppointmentModal({
  open,
  setOpen,
  nutritionist,
  service,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  nutritionist: Nutritionist;
  service: Service;
}) {
  const { t } = useTranslation();

  const [datetime, setDatetime] = useState<Date | undefined>(undefined);

  const { mutate: createAppointment, status, error } = useCreateAppointment();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!datetime) {
      alert("Please select a date and time");
      return;
    }
    const form = e.target as HTMLFormElement;
    createAppointment({
      guest_name: (form.name as unknown as HTMLInputElement).value,
      guest_email: (form.email as unknown as HTMLInputElement).value,
      datetime: datetime.toISOString().slice(0, 19).replace("T", " "),
      nutritionist_id: nutritionist.id,
      service_id: service.id,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-emerald-500">
            {t("scheduleAnAppointmentWith", { name: nutritionist?.name })}
          </AlertDialogTitle>
          <AlertDialogDescription className="-mt-2 mb-2">
            <p>{service?.name}</p>
          </AlertDialogDescription>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                type="text"
                placeholder={t("yourName")}
                required
                name="name"
                disabled={status === "pending" || status === "success"}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                type="email"
                placeholder={t("theEmailYouWantToBeContactedBy")}
                required
                name="email"
                disabled={status === "pending" || status === "success"}
              />
            </div>
            <div
              className={
                "flex flex-col gap-2 " +
                (status === "pending" || status === "success" ? "opacity-50 pointer-events-none" : "")
              }
            >
              <Label htmlFor="time-picker">{t("dayAndTimeOfTheAppointment")}</Label>
              <DateTimePicker setDatetime={setDatetime} />
              {/* Hack to show the default form validation for the customdatetime input */}
              <input name="datetime" className="h-1 -mt-1 opacity-0" value={datetime?.toISOString()} required />
            </div>
            <AlertDialogFooter>
              {status === "success" && (
                <p className="w-full self-center text-center text-sm text-green-500">
                  {t("appointmentRequestedSuccessfully")}
                </p>
              )}
              {status === "error" && (
                <p className="w-full self-center text-center text-sm text-red-500">
                  {error?.message === "Time already booked for nutritionist"
                    ? t("timeAlreadyBookedForNutritionist")
                    : t("errorRequestingAppointment")}
                </p>
              )}
              <Button
                variant="outline"
                className="rounded-xs cursor-pointer"
                onClick={() => setOpen(false)}
                disabled={status === "success"}
              >
                {t("cancel")}
              </Button>
              {status === "success" ? (
                <Button
                  variant="default"
                  className="min-w-24 bg-orange-700/30 hover:bg-orange-800/30 text-orange-700 cursor-pointer rounded-xs"
                  onClick={() => setOpen(false)}
                >
                  {t("exit")}
                </Button>
              ) : (
                <Button
                  className="min-w-24 bg-orange-700/30 hover:bg-orange-800/30 text-orange-700 rounded-xs cursor-pointer"
                  type="submit"
                  disabled={status === "pending"}
                >
                  {status === "pending" ? <LuLoaderCircle className="animate-spin" /> : t("schedule")}
                </Button>
              )}
            </AlertDialogFooter>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

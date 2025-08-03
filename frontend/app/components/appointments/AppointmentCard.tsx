import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "../ui/button";
import type { Appointment } from "~/types/Appointment";
import { Separator } from "../ui/separator";
import { IoMdCalendar } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import Avatar from "../ui/card-avatar";
import { useTranslation } from "react-i18next";

export default function AppointmentCard({
  appointment,
  onAnswerAppointment,
}: {
  appointment: Appointment;
  onAnswerAppointment: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Card className="w-full flex flex-col gap-0 rounded-xs  py-0 px-0 shadow-none">
      <div className="grid grid-cols-[80px_1fr] px-4 py-4">
        <Avatar name={appointment.guest_name} className="size-20" />
        <div className="flex flex-col gap-2">
          <CardHeader className="flex-shrink-0 flex-grow-0 ">
            <CardTitle>{appointment.guest_name}</CardTitle>
            <CardDescription className="block w-full">
              <p className="text-sm text-gray-500 truncate max-w-full">{t("onlineAppointment")}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </div>
      </div>
      <Separator className="" />
      <CardFooter className="flex-row gap-2 items-center justify-center">
        <Button variant="link" className="text-emerald-500 cursor-pointer" onClick={onAnswerAppointment}>
          {t("answerAppointment")}
        </Button>
      </CardFooter>
    </Card>
  );
}

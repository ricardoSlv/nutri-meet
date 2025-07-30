import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "../ui/button";
import type { Appointment } from "~/types/Appointment";
import { Separator } from "../ui/separator";

export default function AppointmentCard({
  appointment,
  onAnswerAppointment,
}: {
  appointment: Appointment;
  onAnswerAppointment: () => void;
}) {
  return (
    <Card className="w-full flex flex-col gap-0 rounded-xs  py-0 px-0">
      <div className="grid grid-cols-[80px_1fr] px-4 py-4">
        <img src="https://placehold.co/600x400" alt="appointment" className=" object-cover h-20 w-20" />
        <div className="flex flex-col gap-2">
          <CardHeader className="flex-shrink-0 flex-grow-0 ">
            <CardTitle>{appointment.guest_name}</CardTitle>
            <CardDescription className="block w-full">
              <p className="text-sm text-gray-500 truncate max-w-full">Online appointment</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 items-start">
              <p className="text-sm text-gray-500">
                {new Date(appointment.datetime).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(appointment.datetime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </CardContent>
        </div>
      </div>
      <Separator className="" />
      <CardFooter className="flex-row gap-2 items-center justify-center">
        <Button variant="link" className="text-emerald-500 cursor-pointer" onClick={onAnswerAppointment}>
          Answer appointment
        </Button>
      </CardFooter>
    </Card>
  );
}

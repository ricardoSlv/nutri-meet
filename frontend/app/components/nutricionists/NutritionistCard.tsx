import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "../ui/button";
import type { Nutritionist } from "~/types/Nutricionist";
import type { Service } from "~/types/Service";

export default function NutricionistCard({
  nutritionist,
  service,
  onScheduleAppointment,
}: {
  nutritionist: Nutritionist;
  service: Service;
  onScheduleAppointment: () => void;
}) {
  return (
    <Card className="w-full gap-4 grid grid-cols-3 rounded-xs">
      <CardHeader className="flex-shrink-0 flex-grow-0 ">
        <CardTitle>{nutritionist.name}</CardTitle>
        <CardDescription className="block w-full">
          <p className="text-sm text-gray-500 truncate max-w-full">{service.name}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">First appointment:</p>
          <p className="text-sm text-gray-500">{Number(service.price).toFixed(2)} €</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="default" onClick={onScheduleAppointment}>
          Schedule an appointment
        </Button>

        <Button variant="outline" className="w-full">
          Website
        </Button>
      </CardFooter>
    </Card>
  );
}

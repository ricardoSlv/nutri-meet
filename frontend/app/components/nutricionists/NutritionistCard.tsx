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
import Avatar from "../ui/card-avatar";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuStar } from "react-icons/lu";
import { PiHandbagSimple } from "react-icons/pi";
import { BsCashStack } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router";

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
    <Card className="w-full gap-4 grid p-6 grid-cols-[80px_1fr_1fr_1fr] rounded-xs max-w-screen-md">
      <Avatar name={nutritionist.name} className="size-20" />
      <div className="flex flex-col gap-2">
        <CardHeader className="flex-shrink-0 flex-grow-0 ">
          <CardTitle>
            <p className="flex items-center gap-1 text-xs font-extrabold bg-emerald-500/30 rounded-2xl text-emerald-500  w-fit px-2 py-1">
              <LuStar />
              FOLLOW-UP
            </p>
            <h1 className="text-lg text-emerald-500 font-bold">{nutritionist.name}</h1>
            <p className="text-sm text-gray-500 font-medium max-w-full">{service.name}</p>
          </CardTitle>
          <CardDescription className="w-full pt-4 pl-4 flex flex-col gap-2">
            <p className="text-sm text-emerald-500 flex items-center gap-2 font-bold truncate">
              <HiOutlineLocationMarker />
              Online follow-up
            </p>
            <p className="text-sm text-gray-500 truncate max-w-full pl-6">{service.location.address}</p>
            <p className="text-sm text-gray-500 truncate max-w-full pl-6">{service.location.municipality}</p>
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent className="flex flex-col gap-2 justify-end items-end pb-8 pr-0 pl-8">
        <div className="flex flex-col gap-1 w-fit">
          <p className="text-sm text-gray-500 w-fit flex items-center gap-2 truncate">
            <PiHandbagSimple className="text-emerald-500" />
            First appointment
            <FaAngleDown />
          </p>
          <p className="text-sm text-gray-500 w-fit flex items-center gap-2">
            <BsCashStack className="text-emerald-500" />
            {Number(service.price).toFixed(2)} €
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 px-0">
        <Button
          onClick={onScheduleAppointment}
          className="w-full bg-orange-700/30 hover:bg-orange-800/30 text-orange-700 rounded-xs cursor-pointer"
        >
          Schedule an appointment
        </Button>

        <Link to={nutritionist.website} target="_blank" className="w-full ">
          <Button className="w-full bg-emerald-500/30 hover:bg-emerald-600/30 text-emerald-500 rounded-xs cursor-pointer">
            Website
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

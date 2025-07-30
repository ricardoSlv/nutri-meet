import { Button } from "~/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "~/components/ui/input";
import { useDebounce } from "use-debounce";

import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "~/components/ui/select";
import ScheduleAppointmentModal from "~/components/appointments/ScheduleAppointmentModal";
import type { Nutritionist } from "~/types/Nutricionist";
import type { Service } from "~/types/Service";
import NutricionistCard from "~/components/nutricionists/NutritionistCard";
import { Link } from "react-router";
import { FaExternalLinkAlt } from "react-icons/fa";
import type { Route } from "./+types/home";
import useNutritionists from "~/hooks/queries/useNutritionists";
import useLocations from "~/hooks/queries/useLocations";
import type { Location } from "~/types/Location";
import Navbar from "~/components/layout/Navbar";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Scheduling Page" }, { name: "description", content: "Meet your nutritionist!" }];
}

export default function Scheduling() {
  const [search, setSearch] = useState("");
  const [querySearch] = useDebounce(search, 500);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const {
    data: nutritionistsResult,
    isLoading: isLoadingNutritionists,
    error: errorNutritionists,
  } = useNutritionists(querySearch);
  const { data: locationsResult, isLoading: isLoadingLocations, error: errorLocations } = useLocations();

  const [open, setOpen] = useState(false);
  const [nutritionist, setNutritionist] = useState<Nutritionist | null>(null);
  const [service, setService] = useState<Service | null>(null);

  if (isLoadingLocations) return <div>Loading...</div>;
  if (errorLocations) return <div>Error: {errorLocations.message}</div>;
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="w-full py-10 bg-linear-to-r from-emerald-500 to-emerald-600 shadow-2xl">
        <div className="flex items-center justify-center w-full max-w-screen-lg mx-auto gap-4">
          <Input
            type="text"
            className="w-full bg-white shadow-lg rounded-xs"
            placeholder="Search for a nutritionist name or service"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full bg-white shadow-lg rounded-xs">
                <SelectValue placeholder="Location" />
                <SelectContent>
                  <SelectItem key="all" value="all" onClick={() => setSelectedLocation("")} className="text-gray-500">
                    Any location
                  </SelectItem>
                  {locationsResult?.locations.map((location: Location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
          <Button className="bg-orange-400 hover:bg-amber-600 px-8 rounded-xs shadow-lg cursor-pointer ">Search</Button>
        </div>
      </div>

      <main className="w-full flex-grow-1 flex items-center justify-start pt-8 pb-4 flex-row mx-auto bg-gray-200 flex-wrap gap-4 p-4">
        {nutritionistsResult?.nutritionists.map((nutritionist: Nutritionist) =>
          nutritionist.services.map((service: Service) => (
            <div key={nutritionist.id + service.id}>
              <NutricionistCard
                nutritionist={nutritionist}
                service={service}
                onScheduleAppointment={() => {
                  setNutritionist(nutritionist);
                  setService(service);
                  setOpen(true);
                }}
              />
            </div>
          ))
        )}
        <ScheduleAppointmentModal
          key={nutritionist?.id ?? "" + service?.id ?? ""}
          open={open}
          setOpen={setOpen}
          nutritionist={nutritionist!}
          service={service!}
        />
      </main>
    </div>
  );
}

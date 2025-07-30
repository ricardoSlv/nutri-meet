import { Button } from "~/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "~/components/ui/input";
import { useDebounce } from "use-debounce";

import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "~/components/ui/select";
import ScheduleAppointmentModal from "~/components/appointments/ScheduleAppointmentModal";
import type { Nutritionist } from "~/types/Nutricionist";
import type { Service } from "~/types/Service";
import { backendUrl } from "~/config/backend";
import NutricionistCard from "~/components/nutricionists/NutritionistCard";
import { Link } from "react-router";
import { FaExternalLinkAlt } from "react-icons/fa";
import type { Route } from "./+types/home";
import useNutritionists from "~/hooks/queries/useNutritionists";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Scheduling Page" }, { name: "description", content: "Meet your nutritionist!" }];
}

export default function Scheduling() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetch(`${backendUrl}/locations`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const [search, setSearch] = useState("");

  const [querySearch] = useDebounce(search, 500);

  const {
    data: nutritionistsResult,
    isLoading: isLoadingNutritionists,
    error: errorNutritionists,
  } = useNutritionists(querySearch);

  const [open, setOpen] = useState(false);
  const [nutritionist, setNutritionist] = useState<Nutritionist | null>(null);
  const [service, setService] = useState<Service | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<string>("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <nav className="flex items-center justify-center w-full flex-col ">
        <div className="bg-green-300 w-full py-4 px-8 shadow-2xl flex items-center justify-between ">
          <h1 className="text-2xl font-bold ">Nutritionists</h1>

          <Button variant="link" className="">
            <Link to="/scheduling" className="text-blue-500 flex flex-row items-center gap-2">
              Scheduling <FaExternalLinkAlt />
            </Link>
          </Button>
          <Button variant="link" className="">
            <Link to="/nutritionists" className="text-blue-500 flex flex-row items-center gap-2">
              Nutritionists Page
              <FaExternalLinkAlt />
            </Link>
          </Button>

          <Select>
            <SelectTrigger className="w-full bg-white shadow-lg rounded-xs">
              <SelectValue placeholder="Select a nutritionist" />
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
        <div className="w-full py-8 bg-green-500 shadow-lg">
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
                    <SelectItem key="all" value="all" onClick={() => setSelectedLocation("")}>
                      All locations
                    </SelectItem>
                    {data?.locations.map((location: any) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
            <Button className="bg-orange-300 px-8 rounded-xs shadow-lg ">Search</Button>
          </div>
        </div>
      </nav>
      <main className="flex items-center justify-center pt-8 pb-4 flex-col mx-auto bg-gray-200 flex-wrap gap-4 p-4">
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
    </>
  );
}

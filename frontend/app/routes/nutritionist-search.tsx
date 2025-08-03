import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { useDebounce } from "use-debounce";

import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "~/components/ui/select";
import ScheduleAppointmentModal from "~/components/appointments/ScheduleAppointmentModal";
import type { Nutritionist } from "~/types/Nutricionist";
import type { Service } from "~/types/Service";
import NutricionistCard from "~/components/nutricionists/NutritionistCard";
import type { Route } from "./+types/home";
import { useNutritionists, type NutritionistSearchParams } from "~/hooks/queries/useNutritionists";
import { useLocations } from "~/hooks/queries/useLocations";
import type { Location } from "~/types/Location";
import Navbar from "~/components/layout/Navbar";
import { useTranslation } from "react-i18next";

import { usePaginatedNutritionistSearchResult } from "~/hooks/queries/usePaginatedNutricionists";
import ClientSidePagination from "~/components/layout/ClientSidePagination";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Scheduling Page" }, { name: "description", content: "Meet your nutritionist!" }];
}

export default function NutritionistSearch() {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  //   const [searchQuery] = useDebounce(search, 500);
  const [searchQuery, setSearchQuery] = useState<NutritionistSearchParams>({
    searchQuery: "",
    location_id: "",
  });
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  const {
    data: nutritionistsResult,
    page,
    setPage,
    totalPages,
    isLoading: isLoadingNutritionists,
    error: errorNutritionists,
  } = usePaginatedNutritionistSearchResult({ ...searchQuery, limit: 4 });

  const { data: locationsResult, isLoading: isLoadingLocations, error: errorLocations } = useLocations();

  const [open, setOpen] = useState(false);
  const [nutritionist, setNutritionist] = useState<Nutritionist | null>(null);
  const [service, setService] = useState<Service | null>(null);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="w-full py-10 bg-linear-to-r from-emerald-500 to-emerald-600 shadow-2xl">
        <div className="flex items-center justify-center w-full max-w-screen-lg mx-auto gap-4">
          <Input
            type="text"
            className="w-full bg-white shadow-lg rounded-xs"
            placeholder={t("searchForANutritionistNameOrService")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={selectedLocationId} onValueChange={setSelectedLocationId}>
            <SelectTrigger className="w-full bg-white shadow-lg rounded-xs">
              <SelectValue placeholder={t("location")} />
              <SelectContent>
                <SelectItem key="all" value="all" onClick={() => setSelectedLocationId("")} className="text-gray-500">
                  {t("anyLocation")}
                </SelectItem>
                {locationsResult?.locations.map((location: Location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.address}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectTrigger>
          </Select>
          <Button
            className="bg-orange-400 hover:bg-amber-600 px-8 rounded-xs shadow-lg cursor-pointer "
            onClick={() =>
              setSearchQuery({
                searchQuery: search,
                location_id: selectedLocationId === "all" ? "" : selectedLocationId,
              })
            }
          >
            {t("search")}
          </Button>
        </div>
      </div>

      <main className="w-full flex-grow-1 flex items-center justify-start pt-8 pb-4 flex-col mx-auto bg-gray-200 gap-4 p-4 ">
        {nutritionistsResult?.map((nutritionist: Nutritionist) =>
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

        {/* Gives me a new modal whenever it is opened or closed */}
        <ScheduleAppointmentModal
          key={`${nutritionist?.id}-${service?.id}-${open}`}
          open={open}
          setOpen={setOpen}
          nutritionist={nutritionist!}
          service={service!}
        />

        <ClientSidePagination page={page} setPage={setPage} totalPages={totalPages} />
      </main>
    </div>
  );
}

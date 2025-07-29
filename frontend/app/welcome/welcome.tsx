import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "~/components/ui/input";
import { useDebounce } from "use-debounce";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";

export function Welcome() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetch("http://localhost:3000/locations").then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const [search, setSearch] = useState("");

  const [querySearch] = useDebounce(search, 500);

  const {
    data: nutritionistsResult,
    isLoading: isLoadingNutritionists,
    error: errorNutritionists,
  } = useQuery({
    queryKey: ["nutritionists", querySearch],
    queryFn: () => fetch(`http://localhost:3000/nutricionists?search=${querySearch}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
    enabled: !!querySearch,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <nav className="flex items-center justify-center pb-4 w-full flex-col ">
        <h1 className="text-2xl font-bold bg-green-300 w-full py-2">Nutritionists</h1>
        <div className="w-full py-8 bg-green-400">
          <div className="flex items-center justify-center w-full max-w-screen-lg mx-auto gap-4">
            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button className="bg-orange-300 px-4">Search</Button>
          </div>
        </div>
      </nav>
      <main className="flex items-center justify-center pt-16 pb-4 max-w-screen-lg mx-auto bg-gray-200 flex-wrap gap-4 p-4">
        {nutritionistsResult?.nutricionists.map((nutritionist: any) =>
          nutritionist.services.map((service: any) => (
            <div key={nutritionist.id}>
              <Card className="w-full gap-4 grid grid-cols-3">
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default">Schedule an appointment</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{nutritionist.name}</DialogTitle>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="w-full">
                    Website
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))
        )}
      </main>
    </>
  );
}

export default function Welcome2() {
  return <Welcome />;
}

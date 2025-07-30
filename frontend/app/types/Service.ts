import type { Location } from "./Location";

export type Service = {
  id: number;
  name: string;
  price: number;
  nutritionist_id: number;
  location: Location;
};

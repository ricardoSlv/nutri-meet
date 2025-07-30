import type { Service } from "./Service";

export type Nutritionist = {
  id: number;
  name: string;
  email: string;
  website: string;
  services: Service[];
};

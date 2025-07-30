import type { Service } from "./Service";

export type Nutritionist = {
  id: number;
  name: string;
  description: string;
  services: Service[];
};

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import PendingAppointmentRequests from "../app/routes/pending-appointment-requests";
import "@testing-library/jest-dom";
import { createTestQueryClient } from "./setup";
import type { ReactElement } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import NutritionistSearch from "~/routes/nutritionist-search";

export function renderWithClient(ui: ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
  return {
    ...result,
    rerender: (rerenderUi: ReactElement) =>
      rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  };
}

vi.mock("~/hooks/queries/usePendingAppointments", () => ({
  usePendingAppointments: () => ({
    data: {
      appointments: [
        {
          id: 1,
          guest_name: "Carlos Silva",
          guest_email: "carlos@example.com",
          datetime: "2025-01-15T10:00:00",
          status: "pending",
          nutritionist_id: 1,
          service_id: 1,
        },
      ],
    },
    isLoading: false,
    error: null,
  }),
}));

vi.mock("~/hooks/queries/useNutritionists", () => ({
  useNutritionists: () => ({
    data: {
      nutritionists: [
        {
          id: 5,
          name: "Pedro Santos",
          email: "pedro@gmail.com",
          website: "https://pedro.com",
          created_at: "2025-08-03T18:04:42.406Z",
          updated_at: "2025-08-03T18:04:42.406Z",
          services: [
            {
              id: 12,
              name: "Perda de peso",
              price: "100.0",
              location_id: 9,
              nutritionist_id: 5,
              created_at: "2025-08-03T18:04:42.740Z",
              updated_at: "2025-08-03T18:04:42.740Z",
              location: {
                id: 9,
                address: "Rua da Praia, 123",
                municipality: "Portimão",
                district: "Faro",
                zipcode: "123456",
                created_at: "2025-08-03T18:04:42.548Z",
                updated_at: "2025-08-03T18:04:42.548Z",
              },
            },
            {
              id: 13,
              name: "Gestão de peso",
              price: "150.0",
              location_id: 10,
              nutritionist_id: 5,
              created_at: "2025-08-03T18:04:42.775Z",
              updated_at: "2025-08-03T18:04:42.775Z",
              location: {
                id: 10,
                address: "Rua do Sobrado, 123",
                municipality: "Vila Verde",
                district: "Braga",
                zipcode: "123456",
                created_at: "2025-08-03T18:04:42.567Z",
                updated_at: "2025-08-03T18:04:42.567Z",
              },
            },
          ],
        },
      ],
    },
  }),
}));

vi.mock("~/hooks/queries/useLocations", () => ({
  useLocations: () => ({
    data: {
      locations: [
        {
          id: 9,
          address: "Rua da Praia, 123",
          municipality: "Portimão",
          district: "Faro",
          zipcode: "123456",
        },
      ],
    },
  }),
}));

// Mock Navbar component
vi.mock("~/components/layout/Navbar", () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));

describe("Nutricitionist Search Page", () => {
  it("should display nutritionist cards", async () => {
    const routes = [
      {
        path: "/nutritionist-search",
        element: <NutritionistSearch />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/nutritionist-search"],
    });

    renderWithClient(<RouterProvider router={router} />);

    const nutritionistCards = screen.getAllByText("Pedro Santos");
    expect(nutritionistCards).toHaveLength(2);

    expect(screen.getByText("Perda de peso")).toBeInTheDocument();
    expect(screen.getByText("Gestão de peso")).toBeInTheDocument();
  });
});

describe("PendingAppointmentRequests Route", () => {
  it("should display appointment cards", async () => {
    const routes = [
      {
        path: "/pending-appointment-requests",
        element: <PendingAppointmentRequests />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/pending-appointment-requests"],
    });

    renderWithClient(<RouterProvider router={router} />);

    const nutritionistSelect = screen.getByRole("combobox");
    expect(nutritionistSelect).toBeInTheDocument();

    expect(screen.getByText("Carlos Silva")).toBeInTheDocument();
  });
});

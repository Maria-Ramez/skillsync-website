import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Payments from "../pages/Payments";

describe("Payments Page", () => {
  test("renders payments page", () => {
    render(
      <MemoryRouter>
        <Payments />
      </MemoryRouter>
    );

    expect(screen.getByText(/payments & transactions/i)).toBeInTheDocument();
  });

  test("displays payment transactions", () => {
    render(
      <MemoryRouter>
        <Payments />
      </MemoryRouter>
    );

    expect(screen.getByText("Ahmed Samir")).toBeInTheDocument();
    expect(screen.getByText("Nour Emad")).toBeInTheDocument();
    expect(screen.getByText("Mona Adel")).toBeInTheDocument();
  });

  test("displays payment summary cards", () => {
    render(
      <MemoryRouter>
        <Payments />
      </MemoryRouter>
    );

    expect(screen.getByText(/total transaction volume/i)).toBeInTheDocument();
    expect(screen.getByText(/wallet top-ups/i)).toBeInTheDocument();
    expect(screen.getByText(/pending transactions/i)).toBeInTheDocument();
  });

  test("displays payment table headers", () => {
    render(
      <MemoryRouter>
        <Payments />
      </MemoryRouter>
    );

    expect(screen.getByText(/transaction id/i)).toBeInTheDocument();
    expect(screen.getByText(/provider status/i)).toBeInTheDocument();
    expect(screen.getByText(/reference/i)).toBeInTheDocument();
  });
});
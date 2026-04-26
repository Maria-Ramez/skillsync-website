import { render, screen } from "@testing-library/react";
import DashboardCard from "../components/DashboardCard";

describe("DashboardCard Component", () => {
  test("renders title, value, and subtitle correctly", () => {
    render(
      <DashboardCard
        title="Total Users"
        value="120"
        subtitle="+10 this week"
        accent="#F5A100"
      />
    );

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("+10 this week")).toBeInTheDocument();
  });

  test("updates when props change", () => {
    render(
      <DashboardCard
        title="Mentors"
        value="50"
        subtitle="+5 this week"
        accent="#00A8E8"
      />
    );

    expect(screen.getByText("Mentors")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("+5 this week")).toBeInTheDocument();
  });
});
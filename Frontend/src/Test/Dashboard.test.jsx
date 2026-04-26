import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

describe("Dashboard cards/components", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("token", "fake-token");

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            totalUsers: 5,
            totalMentors: 3,
            totalCareerPaths: 2,
            activeSessions: 12,
            averageMentorRating: 4.8,
            topFields: [
              {
                title: "Frontend Development",
                count: 2,
                subtitle: "2 mentors",
              },
            ],
            recentMentors: [
              {
                name: "Ahmed Hassan",
                area: "Frontend Development",
                status: "Active",
                sessions: 12,
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders dashboard main sections and stats from backend response", async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/home overview/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText("5").length).toBeGreaterThan(0);
      expect(screen.getAllByText("3").length).toBeGreaterThan(0);
      expect(screen.getAllByText("2").length).toBeGreaterThan(0);
      expect(screen.getAllByText("12").length).toBeGreaterThan(0);
    });

    expect(screen.getByText(/main sectors/i)).toBeInTheDocument();
    expect(screen.getByText(/quick stats/i)).toBeInTheDocument();
    expect(screen.getAllByText(/frontend development/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/ahmed hassan/i)).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/dashboard/stats",
      {
        headers: {
          Authorization: "Bearer fake-token",
        },
      }
    );
  });
});
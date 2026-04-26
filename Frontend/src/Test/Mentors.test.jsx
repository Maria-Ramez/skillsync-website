import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Mentors from "../pages/Mentors";

describe("Mentor Management Page", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("token", "fake-token");

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              _id: "1",
              name: "Ahmed Hassan",
              email: "ahmed@example.com",
              field: "Frontend Development",
              rating: 4.8,
              sessions: 12,
              status: "Active",
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders mentor monitoring page", () => {
    render(
      <MemoryRouter>
        <Mentors />
      </MemoryRouter>
    );

    expect(screen.getByText(/mentor monitoring/i)).toBeInTheDocument();
  });

  test("fetches and displays mentors", async () => {
    render(
      <MemoryRouter>
        <Mentors />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Ahmed Hassan")).toBeInTheDocument();
      expect(screen.getByText("Frontend Development")).toBeInTheDocument();
      expect(screen.getByText("12")).toBeInTheDocument();
    });
  });

  test("opens mentor details modal when view is clicked", async () => {
    render(
      <MemoryRouter>
        <Mentors />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Ahmed Hassan")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /view/i }));

    expect(screen.getByText(/mentor details/i)).toBeInTheDocument();
    expect(screen.getByText("ahmed@example.com")).toBeInTheDocument();
  });

  test("opens edit modal when edit is clicked", async () => {
    render(
      <MemoryRouter>
        <Mentors />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Ahmed Hassan")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    expect(screen.getByText(/edit mentor/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ahmed Hassan")).toBeInTheDocument();
  });

  test("shows empty state when no mentors found", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    render(
      <MemoryRouter>
        <Mentors />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no mentors found/i)).toBeInTheDocument();
    });
  });

  test("calls mentors API with authorization token", async () => {
    render(
      <MemoryRouter>
        <Mentors />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/mentors",
        expect.objectContaining({
          headers: {
            Authorization: "Bearer fake-token",
          },
        })
      );
    });
  });
});
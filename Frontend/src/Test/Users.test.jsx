import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Users from "../pages/Users";

describe("User Management Page", () => {
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
              name: "Test User",
              email: "test@example.com",
              role: "student",
              status: "Active",
            },
            {
              _id: "2",
              name: "Another User",
              email: "another@example.com",
              role: "graduate",
              status: "Blocked",
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders user management page", async () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    expect(screen.getByText(/user management/i)).toBeInTheDocument();
  });

  test("fetches and displays users", async () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
      expect(screen.getByText("Another User")).toBeInTheDocument();
    });
  });

  test("search filters users correctly", async () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search by name/i);

    fireEvent.change(searchInput, {
      target: { value: "another" },
    });

    expect(screen.queryByText("Test User")).not.toBeInTheDocument();
    expect(screen.getByText("Another User")).toBeInTheDocument();
  });

  test("shows empty state when no users found", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no users found/i)).toBeInTheDocument();
    });
  });

  test("calls API with correct endpoint", async () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/users",
        expect.objectContaining({
          headers: {
            Authorization: "Bearer fake-token",
          },
        })
      );
    });
  });
});
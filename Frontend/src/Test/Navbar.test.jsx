import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Navbar logout logic", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test("clears localStorage and navigates to login when logout is clicked", async () => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("admin", JSON.stringify({ id: "1", name: "Maria" }));
    localStorage.setItem("adminLoggedIn", "true");

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("admin")).toBeNull();
      expect(localStorage.getItem("adminLoggedIn")).toBeNull();
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
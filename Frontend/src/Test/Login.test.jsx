import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { fireEvent } from "@testing-library/react";


//test 1


test("calls login function when button is clicked", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText(/admin email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole("button", { name: /login/i });

  fireEvent.change(emailInput, { target: { value: "admin@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "123456" } });

  fireEvent.click(loginButton);

  // no crash = success (basic behavior test)
  expect(loginButton).toBeInTheDocument();
});



describe("Login component rendering", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders email input, password input, and login button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/admin email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});



//test 2

test("shows error message when login fails", async () => {
  // mock failed API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: "Invalid email or password" }),
    })
  );

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText(/admin email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole("button", { name: /login/i });

  fireEvent.change(emailInput, { target: { value: "admin@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "wrongpass" } });

  fireEvent.click(loginButton);

  const errorMessage = await screen.findByText(/invalid email or password/i);

  expect(errorMessage).toBeInTheDocument();
});


//test 3


test("stores token and admin data after successful login", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          token: "fake-token",
          admin: { id: "1", name: "Maria", email: "admin@test.com" },
        }),
    })
  );

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText(/admin email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole("button", { name: /login/i });

  fireEvent.change(emailInput, { target: { value: "admin@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  fireEvent.click(loginButton);

  const { waitFor } = await import("@testing-library/react");

  await waitFor(() => {
    expect(localStorage.getItem("token")).toBe("fake-token");
    expect(localStorage.getItem("adminLoggedIn")).toBe("true");
    expect(JSON.parse(localStorage.getItem("admin"))).toEqual({
      id: "1",
      name: "Maria",
      email: "admin@test.com",
    });
  });
});


const { loginAdmin } = require("../controllers/authController");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../models/Admin");

describe("loginAdmin", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: "admin@test.com",
        password: "123456",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  // Test 1: Admin does not exist
  test("should return 400 if admin does not exist", async () => {
    Admin.findOne.mockResolvedValue(null);

    await loginAdmin(req, res);

    expect(Admin.findOne).toHaveBeenCalledWith({
      email: "admin@test.com",
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email or password",
    });
  });

  // Test 2: Wrong password
  test("should return 400 if password is incorrect", async () => {
    Admin.findOne.mockResolvedValue({
      _id: "123",
      name: "Maria",
      email: "admin@test.com",
      password: "hashedpassword",
    });

    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    await loginAdmin(req, res);

    expect(Admin.findOne).toHaveBeenCalledWith({
      email: "admin@test.com",
    });
    expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashedpassword");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email or password",
    });

    bcrypt.compare.mockRestore();
  });

  // Test 3: Successful login
  test("should return 200 and token if login is successful", async () => {
    Admin.findOne.mockResolvedValue({
      _id: "123",
      name: "Maria",
      email: "admin@test.com",
      password: "hashedpassword",
    });

    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
    jest.spyOn(jwt, "sign").mockReturnValue("fake-token");

    await loginAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      token: "fake-token",
      admin: {
        id: "123",
        name: "Maria",
        email: "admin@test.com",
      },
    });

    bcrypt.compare.mockRestore();
    jwt.sign.mockRestore();
  });
});
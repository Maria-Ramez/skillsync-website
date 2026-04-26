const { createUser } = require("../controllers/userController");
const User = require("../models/User");

jest.mock("../models/User");

describe("User Controller - Validation Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  // ❌ Missing fields
  test("should return 400 if name or email is missing", async () => {
    req.body = { name: "", email: "" };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Name and email are required",
    });
  });

  // ❌ Duplicate user
  test("should return 400 if user already exists", async () => {
    req.body = {
      name: "Maria",
      email: "test@test.com",
    };

    User.findOne.mockResolvedValue({ _id: "123" });

    await createUser(req, res);

    expect(User.findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "User already exists",
    });
  });

  // ✅ Valid user
  test("should create user successfully", async () => {
    req.body = {
      name: "Maria",
      email: "test@test.com",
      role: "student",
      status: "Active",
    };

    User.findOne.mockResolvedValue(null);

    const mockSave = jest.fn().mockResolvedValue({
      name: "Maria",
      email: "test@test.com",
    });

    User.mockImplementation(() => ({
      save: mockSave,
    }));

    await createUser(req, res);

    expect(User.findOne).toHaveBeenCalled();
    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
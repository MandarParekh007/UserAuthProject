import * as UserService from "../services/User.js";
import { register, login, getUserDetails } from "../controllers/UserController.js";

// Mock the UserService module
jest.mock("../services/User.js");

describe("UserController", () => {
  describe("register", () => {
    it("should create a user and return 201 status", async () => {
      const req = { body: { username: "testuser", email: "test@example.com", password: "password" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      
      const mockUser = { id: 1, username: "testuser", email: "test@example.com"};
      UserService.createUser.mockResolvedValue(mockUser);

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, user: mockUser });
    });

    it("should return 500 status on error", async () => {
      const req = { body: { username: "testuser", email: "test@example.com", password: "password" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      UserService.createUser.mockRejectedValue(new Error("Database error"));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "An error occurred while creating the user.",
        error: "Database error",
      });
    });
  });

  describe("login", () => {
    it("should log in the user and return 200 status", async () => {
      const req = { body: { username: "testuser", password: "password" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = { id: 1, username: "testuser" };
      const mockToken = "mock-token";
      UserService.loginUser.mockResolvedValue(mockUser);
      mockUser.createHash = jest.fn().mockResolvedValue(mockToken);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Logged In Successfully",
        token: mockToken,
        loginUser: mockUser,
      });
    });

    it("should return 404 status if user not found", async () => {
      const req = { body: { username: "testuser", password: "password" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      UserService.loginUser.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "User Not Found",
      });
    });

    it("should return 500 status on error", async () => {
      const req = { body: { username: "testuser", password: "password" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      UserService.loginUser.mockRejectedValue(new Error("Login error"));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Error While Logging in the user",
        error: "Login error",
      });
    });
  });

  describe("getUserDetails", () => {
    it("should return user details and 200 status", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = { id: 1, username: "testuser", email: "test@example.com" };
      UserService.getUserById.mockResolvedValue(mockUser);

      await getUserDetails(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User Found Successfully",
        user: mockUser,
      });
    });

    it("should return 404 status if user not found", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      UserService.getUserById.mockResolvedValue(null);

      await getUserDetails(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "No User Found",
      });
    });

    it("should return 500 status on error", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      UserService.getUserById.mockRejectedValue(new Error("Error fetching user"));

      await getUserDetails(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Something Went Wrong",
        error: "Error fetching user",
      });
    });
  });
});

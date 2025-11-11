import { authApi } from "./api";
import { api } from "@/lib/api";
import { mockUser, mockAuthResponse } from "@/test-utils/mocks";

jest.mock("@/lib/api");

const mockedApi = api as jest.Mocked<typeof api>;

describe("authApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getMe", () => {
    it("fetches current user successfully", async () => {
      mockedApi.get.mockResolvedValueOnce({
        data: mockUser,
      });

      const result = await authApi.getMe();

      expect(result).toEqual(mockUser);
      expect(mockedApi.get).toHaveBeenCalledWith("/users/me");
    });

    it("throws error when request fails", async () => {
      mockedApi.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(authApi.getMe()).rejects.toThrow("Network error");
    });

    it("throws error when response validation fails", async () => {
      mockedApi.get.mockResolvedValueOnce({
        data: { invalid: "data" },
      });

      await expect(authApi.getMe()).rejects.toThrow();
    });
  });

  describe("login", () => {
    it("logs in successfully", async () => {
      mockedApi.post.mockResolvedValueOnce({
        data: mockAuthResponse,
      });

      const result = await authApi.login();

      expect(result).toEqual(mockAuthResponse);
      expect(mockedApi.post).toHaveBeenCalledWith("/login");
    });

    it("throws error when login fails", async () => {
      mockedApi.post.mockRejectedValueOnce(new Error("Invalid credentials"));

      await expect(authApi.login()).rejects.toThrow("Invalid credentials");
    });

    it("throws error when response validation fails", async () => {
      mockedApi.post.mockResolvedValueOnce({
        data: { invalid: "data" },
      });

      await expect(authApi.login()).rejects.toThrow();
    });
  });

  describe("register", () => {
    it("registers successfully", async () => {
      mockedApi.post.mockResolvedValueOnce({
        data: mockAuthResponse,
      });

      const result = await authApi.register();

      expect(result).toEqual(mockAuthResponse);
      expect(mockedApi.post).toHaveBeenCalledWith("/register");
    });

    it("throws error when registration fails", async () => {
      mockedApi.post.mockRejectedValueOnce(new Error("User already exists"));

      await expect(authApi.register()).rejects.toThrow("User already exists");
    });
  });

  describe("refresh", () => {
    it("refreshes token successfully", async () => {
      mockedApi.post.mockResolvedValueOnce({
        data: mockAuthResponse,
      });

      const result = await authApi.refresh();

      expect(result).toEqual(mockAuthResponse);
      expect(mockedApi.post).toHaveBeenCalledWith("/refresh");
    });

    it("throws error when refresh fails", async () => {
      mockedApi.post.mockRejectedValueOnce(new Error("Invalid refresh token"));

      await expect(authApi.refresh()).rejects.toThrow("Invalid refresh token");
    });
  });

  describe("logout", () => {
    it("logs out successfully", async () => {
      mockedApi.post.mockResolvedValueOnce({ data: {} });

      await authApi.logout();

      expect(mockedApi.post).toHaveBeenCalledWith("/logout");
    });

    it("does not throw error when logout fails", async () => {
      mockedApi.post.mockRejectedValueOnce(new Error("Logout error"));

      await expect(authApi.logout()).rejects.toThrow("Logout error");
    });
  });
});

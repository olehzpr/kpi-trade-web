import { renderHook, waitFor, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./auth-context";
import { authApi } from "@/services/api/auth/api";
import { api } from "@/lib/api";
import { mockUser, mockAuthResponse } from "@/test-utils/mocks";
import { ReactNode } from "react";

jest.mock("@/services/api/auth/api");
jest.mock("@/lib/api", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(() => 1),
        eject: jest.fn(),
      },
      response: {
        use: jest.fn(() => 1),
        eject: jest.fn(),
      },
    },
  },
}));

const mockedAuthApi = authApi as jest.Mocked<typeof authApi>;
const mockedApi = api as jest.Mocked<typeof api>;

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useAuth", () => {
    it("throws error when used outside AuthProvider", () => {
      // Suppress console.error for this test
      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow("useAuth must be used within a AuthProvider");

      consoleError.mockRestore();
    });

    it("provides auth context when used inside AuthProvider", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.accessToken).toBeNull();
      expect(typeof result.current.login).toBe("function");
      expect(typeof result.current.logout).toBe("function");
      expect(typeof result.current.register).toBe("function");
    });
  });

  describe("login", () => {
    it("logs in user successfully", async () => {
      mockedAuthApi.login.mockResolvedValueOnce(mockAuthResponse);
      mockedAuthApi.getMe.mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);

      const loginPromise = result.current.login();
      await act(async () => {
        await loginPromise;
      });

      await waitFor(() => {
        expect(result.current.accessToken).toBe(mockAuthResponse.accessToken);
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(mockedAuthApi.login).toHaveBeenCalledTimes(1);
    });

    it("fetches user data after login", async () => {
      mockedAuthApi.login.mockResolvedValueOnce(mockAuthResponse);
      mockedAuthApi.getMe.mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      const loginPromise = result.current.login();
      await act(async () => {
        await loginPromise;
      });

      await waitFor(
        () => {
          expect(result.current.user).toEqual(mockUser);
        },
        { timeout: 3000 }
      );

      expect(mockedAuthApi.getMe).toHaveBeenCalled();
    });

    it("handles login errors", async () => {
      const error = new Error("Invalid credentials");
      mockedAuthApi.login.mockRejectedValueOnce(error);

      const { result } = renderHook(() => useAuth(), { wrapper });

      let thrownError: Error | null = null;
      try {
        const loginPromise = result.current.login();
        await act(async () => {
          await loginPromise;
        });
      } catch (e) {
        thrownError = e as Error;
      }

      expect(thrownError).toBeTruthy();
      expect(thrownError?.message).toBe("Invalid credentials");
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.accessToken).toBeNull();
    });

    it("sets loading state during login", async () => {
      mockedAuthApi.login.mockResolvedValueOnce(mockAuthResponse);
      mockedAuthApi.getMe.mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.isLoading).toBe(false);

      const loginPromise = result.current.login();

      await act(async () => {
        await loginPromise;
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe("register", () => {
    it("registers user successfully", async () => {
      mockedAuthApi.register.mockResolvedValueOnce(mockAuthResponse);
      mockedAuthApi.getMe.mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      const registerPromise = result.current.register();
      await act(async () => {
        await registerPromise;
      });

      await waitFor(() => {
        expect(result.current.accessToken).toBe(mockAuthResponse.accessToken);
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(mockedAuthApi.register).toHaveBeenCalledTimes(1);
    });

    it("handles registration errors", async () => {
      const error = new Error("User already exists");
      mockedAuthApi.register.mockRejectedValueOnce(error);

      const { result } = renderHook(() => useAuth(), { wrapper });

      let thrownError: Error | null = null;
      try {
        const registerPromise = result.current.register();
        await act(async () => {
          await registerPromise;
        });
      } catch (e) {
        thrownError = e as Error;
      }

      expect(thrownError).toBeTruthy();
      expect(thrownError?.message).toBe("User already exists");
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe("logout", () => {
    it("logs out user successfully", async () => {
      mockedAuthApi.login.mockResolvedValueOnce(mockAuthResponse);
      mockedAuthApi.getMe.mockResolvedValueOnce(mockUser);
      mockedAuthApi.logout.mockResolvedValueOnce();

      const { result } = renderHook(() => useAuth(), { wrapper });

      // First login
      const loginPromise = result.current.login();
      await act(async () => {
        await loginPromise;
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
      });

      // Then logout
      const logoutPromise = result.current.logout();
      await act(async () => {
        await logoutPromise;
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.accessToken).toBeNull();
      expect(result.current.user).toBeNull();
      expect(mockedAuthApi.logout).toHaveBeenCalledTimes(1);
    });

    it("clears auth state even if logout API call fails", async () => {
      mockedAuthApi.login.mockResolvedValueOnce(mockAuthResponse);
      mockedAuthApi.getMe.mockResolvedValueOnce(mockUser);
      mockedAuthApi.logout.mockRejectedValueOnce(new Error("Logout failed"));

      const { result } = renderHook(() => useAuth(), { wrapper });

      // First login
      const loginPromise = result.current.login();
      await act(async () => {
        await loginPromise;
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
      });

      // Logout should clear state even on error
      const logoutPromise = result.current.logout();
      await act(async () => {
        await logoutPromise;
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.accessToken).toBeNull();
      expect(result.current.user).toBeNull();
    });
  });

  describe("interceptors", () => {
    it("sets up interceptors on mount", () => {
      renderHook(() => useAuth(), { wrapper });

      // Interceptors are set up in useEffect
      expect(mockedApi.interceptors.request.use).toHaveBeenCalled();
      expect(mockedApi.interceptors.response.use).toHaveBeenCalled();
    });

    it("cleans up interceptors on unmount", () => {
      const { unmount } = renderHook(() => useAuth(), { wrapper });

      unmount();

      expect(mockedApi.interceptors.request.eject).toHaveBeenCalled();
      expect(mockedApi.interceptors.response.eject).toHaveBeenCalled();
    });
  });
});

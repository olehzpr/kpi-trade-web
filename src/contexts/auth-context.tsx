import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/auth/user";
import { api } from "@/lib/api";
import { AxiosError, AxiosRequestConfig } from "axios";
import { authApi } from "@/services/api/auth/api";

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

let refreshTokenPromise: Promise<string> | null = null;

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [interceptorsReady, setInterceptorsReady] = useState<boolean>(false);

  const isAuthenticated = !!accessToken;

  const withLoading = async <T,>(fn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      return await fn();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    return withLoading(async () => {
      try {
        await authApi.logout();
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        setAccessToken(null);
        setUser(null);
      }
    });
  };

  // const updateUser = () => {
  //   if (!accessToken || !interceptorsReady) return Promise.resolve();
  //
  //   return withLoading(async () => {
  //     try {
  //       const userResponse = await authApi.getMe();
  //       setUser(userResponse);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   });
  // };

  const refreshToken = async (): Promise<string> => {
    if (refreshTokenPromise) {
      return refreshTokenPromise;
    }

    refreshTokenPromise = authApi
      .refresh()
      .then(({ accessToken }) => {
        setAccessToken(accessToken);
        return accessToken;
      })
      .catch((error) => {
        logout();
        throw error;
      })
      .finally(() => {
        refreshTokenPromise = null;
      });

    return refreshTokenPromise;
  };

  const login = () => {
    return withLoading(async () => {
      try {
        const { accessToken: newToken } = await authApi.login();
        setAccessToken(newToken);
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    });
  };

  const register = () => {
    return withLoading(async () => {
      try {
        const { accessToken: newToken } = await authApi.register();
        setAccessToken(newToken);
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    });
  };

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          accessToken
        ) {
          originalRequest._retry = true;
          try {
            const newToken = await refreshToken();

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );

    setInterceptorsReady(true);

    return () => {
      setInterceptorsReady(false);
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken || !interceptorsReady) {
      return;
    }
    withLoading(async () => {
      try {
        const userResponse = await authApi.getMe();
        setUser(userResponse);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });
  }, [accessToken, interceptorsReady]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated,
        login,
        register,
        logout,
        isLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return authContext;
};

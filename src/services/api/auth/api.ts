import { api } from "@/lib/api";
import { User } from "@/types/auth/user";
import {
  AuthResponse,
  AuthResponseSchema,
  UserResponse,
  UserResponseSchema,
} from "@/services/api/auth/responses";

export const authApi = {
  getMe: async (): Promise<UserResponse> => {
    const res = await api.get<User>("/users/me");
    return UserResponseSchema.parse(res.data);
  },

  login: async (): Promise<AuthResponse> => {
    const res = await api.post("/login");
    return AuthResponseSchema.parse(res.data);
  },

  register: async (): Promise<AuthResponse> => {
    const res = await api.post("/register");
    return AuthResponseSchema.parse(res.data);
  },

  refresh: async (): Promise<AuthResponse> => {
    const res = await api.post("/refresh");
    return AuthResponseSchema.parse(res.data);
  },

  logout: async (): Promise<void> => {
    await api.post("/logout");
  },
};

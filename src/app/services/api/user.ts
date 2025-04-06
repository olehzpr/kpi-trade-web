import { api } from "@/lib/api";
import { User } from "@/types/user";

export const getMe = async () => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

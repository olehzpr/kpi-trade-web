import {api} from "@/lib/api";
import {User} from "@/types/user/user";
import {UserResponse, UserResponseSchema} from "@/services/api/user/responses";

export const getMe = async (): Promise<UserResponse> => {
  const res = await api.get<User>("/users/me");
  return UserResponseSchema.parse(res.data);
};

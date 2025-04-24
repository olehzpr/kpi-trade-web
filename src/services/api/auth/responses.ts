import { UserSchema } from "@/types/auth/user";
import { z } from "zod";

export const UserResponseSchema = UserSchema;

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

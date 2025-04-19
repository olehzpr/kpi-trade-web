import { UserSchema } from "@/types/user/user";
import { z } from "zod";

export const UserResponseSchema = UserSchema;

export type UserResponse = z.infer<typeof UserResponseSchema>;

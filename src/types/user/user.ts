import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  telegramId: z.string(),
  telegramUsername: z.string(),
  phone: z.string().optional(),
  instagram: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

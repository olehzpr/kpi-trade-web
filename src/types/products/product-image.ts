import { z } from "zod";

export const ProductImageSchema = z.object({
  id: z.number(),
  url: z.string(),
});

export type ProductImage = z.infer<typeof ProductImageSchema>;

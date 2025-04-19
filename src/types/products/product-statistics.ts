import { z } from "zod";

export const ProductStatisticsSchema = z.object({
  viewCount: z.number(),
  uniqueViewCount: z.number(),
  timeOnPage: z.number(),
});

export type ProductStatistics = z.infer<typeof ProductStatisticsSchema>;

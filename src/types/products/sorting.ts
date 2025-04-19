import {z} from "zod";

export const SortingSchema = z.object({
    sorted: z.boolean(),
    empty: z.boolean(),
    unsorted: z.boolean(),
});

export type Sorting = z.infer<typeof SortingSchema>;

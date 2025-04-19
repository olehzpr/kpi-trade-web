import {z} from "zod";
import {SortingSchema} from "@/types/products/sorting";

export const PagingSchema = z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    offset: z.number(),
    sort: SortingSchema,
    unpaged: z.boolean(),
    paged: z.boolean(),
});

export type Paging = z.infer<typeof PagingSchema>;

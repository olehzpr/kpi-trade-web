import z from "zod";

export const createProductFormSchema = z.object({
  title: z.string().min(3, { message: "Назва має бути принаймні 3 символи." }),
  description: z
    .string()
    .min(10, { message: "Опис має бути принаймні 10 символів." }),
  price: z.coerce
    .number({ invalid_type_error: "Будь ласка, введіть число." })
    .positive({ message: "Ціна має бути більшою за 0." }),
  telegram: z.string().optional(),
  instagram: z.string().optional(),
  phone: z.string().optional(),
  image: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Зображення є обов'язковим.")
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "Файл має бути зображенням."
    ),
});

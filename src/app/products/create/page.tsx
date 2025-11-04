"use client";

import { ImageUploadInput } from "@/components/products/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createProductFormSchema } from "@/schemas/createProductFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormSchemaType = z.infer<typeof createProductFormSchema>;

export default function CreateProductPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      title: "",
      description: "",
      telegram: "",
      instagram: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log("Form data submitted:", data);

    // TODO: Add your API call or logic to create the product here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 w-full mb-6"
    >
      <h2 className="text-2xl font-bold mb-3 sm:hidden">
        Створити нове оголошення
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="w-full">
          <ImageUploadInput name="image" control={control} />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1 px-2">
              {errors.image.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:col-span-2">
          <h2 className="text-2xl font-bold mb-3 hidden sm:block">
            Створити нове оголошення
          </h2>

          <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md">
            <Label className="text-sm" htmlFor="title">
              Назва оголошення
            </Label>
            <Input
              id="title"
              placeholder="Головна назва"
              className="border-none"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md">
            <Label className="text-sm" htmlFor="description">
              Опис товару
            </Label>
            <Textarea
              id="description"
              placeholder="Детальніше про товар..."
              className="border-none"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md">
            <Label className="text-sm" htmlFor="category">
              Категорія (визначається автоматично)
            </Label>
            <Input
              id="category"
              disabled
              placeholder="Електроніка"
              className="border-none"
            />
          </div>

          <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md">
            <Label className="text-sm" htmlFor="price">
              Ціна товару
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="Ціна товару в грн"
              className="border-none"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md">
            <Label className="text-sm">
              Персональні контакти (необов'язково)
            </Label>
            <Input
              id="telegram"
              placeholder="Telegram (напр. @username)"
              className="border-none"
              {...register("telegram")}
            />
            <Input
              id="instagram"
              placeholder="Instagram (напр. @username)"
              className="border-none"
              {...register("instagram")}
            />
            <Input
              id="phone"
              type="tel"
              placeholder="Номер телефону"
              className="border-none"
              {...register("phone")}
            />
          </div>

          <Button type="submit">Створити оголошення</Button>
        </div>
      </div>
    </form>
  );
}

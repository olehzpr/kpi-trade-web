"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Control, useController } from "react-hook-form";

type ImageUploadInputProps = {
  name: string;
  control: Control<any>;
};

export function ImageUploadInput({ name, control }: ImageUploadInputProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const fileList: FileList | null = field.value;
  const file = fileList?.[0];

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    setPreview(null);
  }, [file]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      field.onChange(e.target.files);
    }
  };

  const onRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    field.onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const inputId = `image-upload-${name}`;

  return (
    <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md h-fit">
      <div className="relative">
        <label
          htmlFor={inputId}
          className="aspect-square flex items-center justify-center bg-neutral-100 rounded-lg border-dashed border-2 cursor-pointer overflow-hidden"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-gray-500 p-4 text-center">
              Завантажити зображення
            </p>
          )}
        </label>

        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
          onBlur={field.onBlur}
        />

        {preview && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onRemoveImage}
            className="absolute top-2 right-2 h-8 w-8 p-0"
            aria-label="Remove image"
          >
            <XIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

import Image from "next/image";
import { ProductImage } from "@/types/products/product-image";

export default function ImageGallery({ images }: { images: ProductImage[] }) {
  return (
    <>
      <div className="space-y-4">
        {images.length > 0 ? (
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={images[0].url}
              alt="Product image"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-square flex items-center justify-center bg-neutral-100 rounded-lg">
            <p className="text-gray-500">Без зображення</p>
          </div>
        )}

        {/* Thumbnail gallery */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {images.map((image) => (
              <div
                key={image.id}
                className="aspect-square relative rounded overflow-hidden bg-gray-100"
              >
                <Image
                  src={image.url}
                  alt="Product thumbail"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

import { ProductWithDetails } from "@/types/products/product";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { formatDistanceToNow } from "date-fns";

type ProductCardProps = {
  product: ProductWithDetails;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  // Format the price (assuming price is in cents)
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100);

  // Format the date
  const timeAgo = formatDistanceToNow(new Date(product.createdAt), {
    addSuffix: true,
  });

  return (
    <Link href={`/products/${product.id}`} className="h-full">
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
        {/* Image container with fixed aspect ratio */}
        <div className="relative aspect-square">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}

          {/* Favorite indicator */}
          <div className="absolute top-2 right-2">
            <Heart
              className={`h-5 w-5 ${
                product.favorite ? "text-red-500 fill-red-500" : "text-white"
              }`}
            />
          </div>

          {/* Category badge */}
          <div className="absolute bottom-2 left-2">
            <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
              {product.category.name}
            </span>
          </div>
        </div>

        <CardHeader className="pb-2">
          <h3 className="font-medium line-clamp-2 h-12">{product.name}</h3>
        </CardHeader>

        <CardContent className="pb-2">
          <p className="text-gray-500 text-sm line-clamp-2">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center text-sm pt-2">
          <div className="flex items-center text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            <span>{product.statistics?.viewCount ?? "No views"}</span>
          </div>
          <div className="font-bold text-blue-600">{formattedPrice}</div>
        </CardFooter>

        <div className="px-4 pb-4 text-xs text-gray-400">{timeAgo}</div>
      </Card>
    </Link>
  );
};

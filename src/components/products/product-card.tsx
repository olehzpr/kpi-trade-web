import { ProductWithDetails } from "@/types/products/product";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { uk } from "date-fns/locale";

type ProductCardProps = {
  product: ProductWithDetails;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: "UAH",
  }).format(product.price);

  const timeAgo = formatDistanceToNow(new Date(product.createdAt), {
    addSuffix: true,
    locale: uk,
  });

  return (
    <Link href={`/products/${product.id}`} className="h-full">
      <Card className="h-full flex flex-col gap-2 overflow-hidden hover:shadow-md transition-shadow duration-200 border-none py-0 rounded-md">
        <div className="relative aspect-square">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
              <span className="text-gray-500">Без зображення</span>
            </div>
          )}

          <div className="absolute bottom-2 left-2">
            <span className="bg-primary bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
              {product.category.name}
            </span>
          </div>
        </div>

        <CardHeader className="pt-2">
          <h3 className="font-medium line-clamp-2">{product.name}</h3>
        </CardHeader>

        <CardContent>
          <p className="text-gray-500 text-sm line-clamp-2">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center text-sm mt-auto">
          <div className="flex items-center text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            <span>{product.statistics?.viewCount ?? "No views"}</span>
          </div>
          <div className="font-bold text-primary">{formattedPrice}</div>
        </CardFooter>

        <div className="px-4 pb-4 text-xs text-gray-400">{timeAgo}</div>
      </Card>
    </Link>
  );
};

import Image from "next/image";
import { getProduct } from "@/services/api/products/api";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  Heart,
  Clock,
  Calendar,
  Phone,
  Instagram,
  MessageCircle,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const productIdNumber = Number(productId);

  if (Number.isNaN(productIdNumber)) {
    return (
      <div className="container mx-auto p-4 text-center">Product not found</div>
    );
  }

  const product = await getProduct(productIdNumber);

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center">Product not found</div>
    );
  }

  // Format the price (assuming price is in cents)
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100);

  // Format dates
  const createdAtFormatted = formatDistanceToNow(new Date(product.createdAt), {
    addSuffix: true,
  });
  const updatedAtFormatted = formatDistanceToNow(new Date(product.updatedAt), {
    addSuffix: true,
  });

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/products"
        className="flex items-center mb-6 text-blue-600 hover:text-blue-800"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to all products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {product.images.length > 0 ? (
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center bg-gray-200 rounded-lg">
              <p className="text-gray-500">No image available</p>
            </div>
          )}

          {/* Thumbnail gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square relative rounded overflow-hidden bg-gray-100"
                >
                  <Image
                    src={image.url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {formattedPrice}
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Posted {createdAtFormatted}</span>
              {product.createdAt !== product.updatedAt && (
                <span className="ml-2">(Updated {updatedAtFormatted})</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1 text-gray-500" />
              <span>{product.statistics.viewCount} views</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-500" />
              <span>
                ~{Math.round(product.statistics.timeOnPage)}s avg time
              </span>
            </div>
            <div className="flex items-center">
              {product.favorite ? (
                <Heart className="w-4 h-4 mr-1 text-red-500 fill-red-500" />
              ) : (
                <Heart className="w-4 h-4 mr-1 text-gray-500" />
              )}
              <span>
                {product.favorite ? "In favorites" : "Add to favorites"}
              </span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium mb-2">Category</h2>
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {product.category.name}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="font-medium mb-2">Seller Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{product.seller.telegramUsername}</p>

              <div className="mt-4 space-y-2 text-sm">
                {product.seller.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <a
                      href={`tel:${product.seller.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {product.seller.phone}
                    </a>
                  </div>
                )}

                {product.seller.instagram && (
                  <div className="flex items-center">
                    <Instagram className="w-4 h-4 mr-2 text-gray-500" />
                    <a
                      href={`https://instagram.com/${product.seller.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      @{product.seller.instagram}
                    </a>
                  </div>
                )}

                {product.seller.telegramId && (
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-gray-500" />
                    <a
                      href={`https://t.me/${product.seller.telegramUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      @{product.seller.telegramUsername}
                    </a>
                  </div>
                )}
              </div>

              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

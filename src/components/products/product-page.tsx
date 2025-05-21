"use client";

import { Calendar, Phone, UserIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/api/products/api";
import ImageGallery from "@/components/products/image-gallery";
import GoBack from "@/components/ui/go-back";
import { User } from "@/types/user/user";
import { Category } from "@/types/categories/category";
import { ProductWithDetails } from "@/types/products/product";
import CategoryChip from "@/components/categories/CategoryChip";
import { SiInstagram, SiTelegram } from "@icons-pack/react-simple-icons";
import { ComponentType, HTMLProps, SVGProps } from "react";
import { uk } from "date-fns/locale";
import ContactSellerButton from "@/components/products/contact-seller-button";

export default function Product({ productId }: { productId: number }) {
  const { data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  return (
    <div className="container mx-auto px-4 mb-10 sm:mb-0">
      <GoBack href={"/"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageGallery images={product!.images} />
        <div className="space-y-6">
          <MainSection product={product!} />
          <Separator />
          <DescriptionSection description={product!.description} />
          <Separator />
          <CategorySection category={product!.category} />
          <Separator />
          <SellerSection seller={product!.seller} />
        </div>
      </div>
    </div>
  );
}

function MainSection({ product }: { product: ProductWithDetails }) {
  const formattedPrice = new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: "UAH",
  }).format(product!.price);

  const createdAtFormatted = formatDistanceToNow(new Date(product!.createdAt), {
    addSuffix: true,
    locale: uk,
  });

  const updatedAtFormatted = formatDistanceToNow(new Date(product!.updatedAt), {
    addSuffix: true,
    locale: uk,
  });

  return (
    <section className="flex flex-col gap-2">
      <div>
        <h1 className="text-3xl font-bold">{product!.name}</h1>
        <p className="text-2xl font-bold text-primary mt-2">{formattedPrice}</p>
        <div className="flex items-center mt-2 text-sm text-neutral-600">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Створено {createdAtFormatted}</span>
          {product!.createdAt !== product!.updatedAt && (
            <span className="ml-2">(Оновлено {updatedAtFormatted})</span>
          )}
        </div>
      </div>
      <ContactSellerButton seller={product!.seller} />
    </section>
  );
}

function DescriptionSection({ description }: { description: string }) {
  return (
    <section>
      <h2 className="font-medium mb-2">Опис товару</h2>
      <p className="text-gray-700 whitespace-pre-line">{description}</p>
    </section>
  );
}

function CategorySection({ category }: { category: Category }) {
  return (
    <section>
      <h2 className="font-medium mb-2">Категорія</h2>
      <CategoryChip category={category} />
    </section>
  );
}

function SellerSection({ seller }: { seller: User }) {
  return (
    <section>
      <h2 className="font-medium mb-2">Інформація про продавця</h2>
      <div className="rounded-lg flex flex-col gap-2">
        <div className="flex items-center text-sm gap-2">
          <UserIcon className="w-4 h-4 text-primary" />
          <p className="font-medium">{seller.telegramUsername}</p>
        </div>

        <div className="space-y-2 text-sm">
          {seller.phone && (
            <ExternalLink Icon={Phone} href={`tel:${seller.phone}`}>
              {seller.phone}
            </ExternalLink>
          )}

          {seller.instagram && (
            <ExternalLink
              Icon={SiInstagram}
              href={`https://instagram.com/${seller.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{seller.instagram}
            </ExternalLink>
          )}

          <ExternalLink
            Icon={SiTelegram}
            href={`https://t.me/${seller.telegramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{seller.telegramUsername}
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}

function ExternalLink({
  Icon,
  children,
  ...rest
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
} & HTMLProps<HTMLAnchorElement>) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-primary" />
      <a className="text-blue-600 hover:underline" {...rest}>
        {children}
      </a>
    </div>
  );
}

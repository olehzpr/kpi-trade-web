"use client";
import { useProducts } from "@/hooks/products/useProducts";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { ProductWithDetails } from "@/types/products/product";
import { ProductCard } from "@/components/products/product-card";
import Filters from "@/components/products/filters";
import MobileFilters from "@/components/products/mobile-filters";
import Sorting from "@/components/products/sorting";
import { useCategories } from "@/hooks/categories/useCategories";
import Search from "./search";

export default function ProductsPage() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  if (productsLoading || categoriesLoading) {
    return <LoadingSpinner description={"Loading..."} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Пошук товарів</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="hidden lg:block w-64">
          <Filters categories={categories} />
        </div>

        <div className="sm:hidden">
          <Search />
        </div>

        <div className="flex-1">
          <div className="mb-6 flex gap-4 justify-between sm:justify-start">
            <div className="hidden sm:block w-full">
              <Search />
            </div>
            <div className="sm:hidden">
              <MobileFilters categories={categories} />
            </div>
            <Sorting />
          </div>

          {products?.content?.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-2">
                Не знайдено жодних товарів за даним запитом
              </p>
              <p className="text-gray-500 text-sm">Спробуйте змінити фільтри</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products?.content?.map((product: ProductWithDetails) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

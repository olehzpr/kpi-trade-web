"use client";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { useProducts } from "@/hooks/products/useProducts";
import { ProductWithDetails } from "@/types/products/product";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Home() {
  const { data, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Mock category data - replace with actual data as needed
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Music & Entertainment" },
    { id: 3, name: "Clothing" },
    { id: 4, name: "Home & Garden" },
    { id: 5, name: "Sports & Outdoors" },
  ];

  if (isLoading) {
    return <LoadingSpinner description={"Loading..."} />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Error loading products</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  // Filter products based on search term
  const filteredProducts =
    data?.content?.filter(
      (product: ProductWithDetails) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort(
    (a: ProductWithDetails, b: ProductWithDetails) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "popular":
          return (
            (b.statistics?.viewCount ?? 0) - (a.statistics?.viewCount ?? 0)
          );
        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    },
  );

  // Filter component (desktop)
  const FiltersComponent = () => (
    <Card className="h-fit sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={`category-${category.id}`} />
                <Label htmlFor={`category-${category.id}`}>
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-4">Price Range</h3>
          <Slider defaultValue={[0, 1000]} min={0} max={1000} step={10} />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">Product Status</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="new-items" />
              <Label htmlFor="new-items">New items</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="featured" />
              <Label htmlFor="featured">Featured</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="on-sale" />
              <Label htmlFor="on-sale">On Sale</Label>
            </div>
          </div>
        </div>

        <Button className="w-full mt-4">Apply Filters</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Marketplace</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64">
          <FiltersComponent />
        </div>

        {/* Mobile filters button */}
        <div className="lg:hidden mb-4">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down products based on your preferences
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FiltersComponent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Search and sort bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results summary */}
          <div className="mb-4 text-sm text-gray-500">
            Showing {sortedProducts.length} results
            {searchTerm && (
              <span>
                {" "}
                for &quot;<span className="font-medium">{searchTerm}</span>
                &quot;
              </span>
            )}
          </div>

          {/* No results message */}
          {sortedProducts.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-2">No products found</p>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          )}

          {/* Product grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product: ProductWithDetails) => (
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

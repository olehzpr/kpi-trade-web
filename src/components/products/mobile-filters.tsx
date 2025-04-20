import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import Filters from "@/components/products/filters";
import { useState } from "react";
import { Category } from "@/types/categories/category";

export default function MobileFilters({
  categories,
}: {
  categories?: Category[];
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center shadow-sm shadow-neutral-200 rounded-md"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Фільтри
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Фільтри</SheetTitle>
          <SheetDescription>
            Звужте список продуктів на основі ваших уподобань
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Filters categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

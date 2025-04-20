import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/categories/category";

export default function Filters({ categories }: { categories?: Category[] }) {
  return (
    <Card className="h-fit sticky top-4 border-none shadow-sm shadow-neutral-200 rounded-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          <h2 className="text-xl">Фільтри</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Категорії</h3>
          <div className="space-y-2">
            {categories?.map((category) => (
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
          <h3 className="font-medium mb-4">Ціна</h3>
          <Slider defaultValue={[0, 1000]} min={0} max={1000} step={10} />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">Статус</h3>
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
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Sorting() {
  const [sortOption, setSortOption] = useState<string>("popular");

  return (
    <Select value={sortOption} onValueChange={setSortOption}>
      <SelectTrigger className="shadow-sm shadow-neutral-200 rounded-md">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="border-none">
        <SelectItem value="popular">За популярністю</SelectItem>
        <SelectItem value="newest">За датою створення</SelectItem>
        <SelectItem value="price-asc">Від дешевших до дорогих</SelectItem>
        <SelectItem value="price-desc">Від дорогих до дешевших</SelectItem>
      </SelectContent>
    </Select>
  );
}

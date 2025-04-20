import { Category } from "@/types/categories/category";
import Link from "next/link";

export default function CategoryChip({ category }: { category: Category }) {
  return (
    <Link href={{ pathname: "/", search: "?category=" + category.id }}>
      <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
        {category.name}
      </div>
    </Link>
  );
}

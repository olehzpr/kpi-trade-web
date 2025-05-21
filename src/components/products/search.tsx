import { Input } from "@/components/ui/input";
import { useProductFilters } from "@/store/useProductFilters";
import { debounce } from "lodash";
import { SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");

  const setFilters = useProductFilters((state) => state.setFilters);

  const debouncedSetFilters = debounce((value: string) => {
    setFilters({ name: value });
  }, 500);

  useEffect(() => {
    debouncedSetFilters(searchValue);
    return () => debouncedSetFilters.cancel();
  }, [searchValue]);

  return (
    <div className="relative flex-1 shadow-sm shadow-neutral-200 rounded-md">
      <SearchIcon
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
      <Input
        placeholder="Я шукаю..."
        className="pl-10"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={() => setSearchValue("")}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

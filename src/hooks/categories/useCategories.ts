import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/api/categories/api";

export const useCategories = () => {
  return useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

import { useQuery } from "@tanstack/react-query";
import { ProductType } from "@/types/global";

const fetchSuggestions = async (keyword: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products?keyword=${keyword}`);
  return response.json();
};

export const useSuggestions = (value: string) => {
  return useQuery({
    queryKey: ["suggestions", value],
    queryFn: () => fetchSuggestions(value),
    select: (data): ProductType[] => data.list,
    enabled: false,
  });
};

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { ProductType } from "@/types/global";

const fetchProducts = async (pageParam: number, queryString: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products?cursor=${pageParam}&${queryString}`);

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  return res.json();
};

export const useGetFilteredProducts = (queryString: string) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["products", queryString],
    queryFn: async ({ pageParam }) => fetchProducts(pageParam, queryString),
    select: (data): ProductType[] => data.pages.map((page) => page.list).flat(),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
};

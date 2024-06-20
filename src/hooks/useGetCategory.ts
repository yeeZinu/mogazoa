import { useQuery } from "@tanstack/react-query";

const fetchCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`);
  return res.json();
};

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });
};

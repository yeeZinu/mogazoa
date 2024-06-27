import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ProductRequestType } from "@/types/global";

export const useUpdateProduct = (token: string) => {
  const router = useRouter();

  const updateProductMutation = useMutation({
    mutationFn: async (data: ProductRequestType) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(JSON.stringify(error));
      }

      return res.json();
    },
    onSuccess: (response) => {
      setTimeout(() => {
        router.push(`/product/${response.id}`);
      }, 2000);
    },
  });

  return { updateProductMutation };
};

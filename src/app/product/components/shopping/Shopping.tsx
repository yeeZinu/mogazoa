"use client";

import { useQuery } from "@tanstack/react-query";
import CoupnagCard from "@/app/product/components/card/CoupangCard";
import NaverCard from "@/app/product/components/card/NaverCard";
import ProductSkeleton from "@/app/product/components/skeleton/ProductSkeleton";
import { fetchShoppingList } from "@/app/product/utils/apis";
import { CoupangProduct, NaverProduct } from "@/app/product/utils/types";
import styles from "./Shopping.module.scss";

export default function Shopping({ name }: { name: string }) {
  const { isPending: coupangIsLoading, data: coupangData } = useQuery<{ items: CoupangProduct[] }>({
    queryKey: ["coupang", name],
    queryFn: () => fetchShoppingList("coupang", name),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
  const { isPending: naverIsLoading, data: naverData } = useQuery<{ items: NaverProduct[] }>({
    queryKey: ["naver", name],
    queryFn: () => fetchShoppingList("naver", name),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  return (
    <section className={styles.container}>
      <div className={styles.layout}>
        {coupangIsLoading ? (
          <ProductSkeleton />
        ) : (
          coupangData?.items?.map((product) => (
            <CoupnagCard
              key={product.link}
              product={product}
            />
          ))
        )}
      </div>
      <div className={styles.layout}>
        {naverIsLoading ? (
          <ProductSkeleton />
        ) : (
          naverData?.items?.map((product) => (
            <NaverCard
              key={product.link}
              product={product}
            />
          ))
        )}
      </div>
    </section>
  );
}

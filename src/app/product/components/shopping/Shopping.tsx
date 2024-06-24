"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import CoupangCard from "@/app/product/components/card/CoupangCard";
import NaverCard from "@/app/product/components/card/NaverCard";
import { fetchShoppingList } from "@/app/product/utils/apis";
import { CoupangProduct, NaverProduct } from "@/app/product/utils/types";
import styles from "./Shopping.module.scss";

export default function Shopping({ name }: { name: string }) {
  const { data: coupangData } = useSuspenseQuery<{ items: CoupangProduct[] }>({
    queryKey: ["coupang", name],
    queryFn: () => fetchShoppingList("coupang", name) as Promise<{ items: CoupangProduct[] }>,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
  const { data: naverData } = useSuspenseQuery<{ items: NaverProduct[] }>({
    queryKey: ["naver", name],
    queryFn: () => fetchShoppingList("naver", name) as Promise<{ items: NaverProduct[] }>,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  return (
    <section className={styles.container}>
      <div className={styles.layout}>
        {coupangData?.items?.map((product) => (
          <CoupangCard
            key={product.link}
            product={product}
          />
        ))}
      </div>
      <div className={styles.layout}>
        {naverData?.items?.map((product) => (
          <NaverCard
            key={product.link}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

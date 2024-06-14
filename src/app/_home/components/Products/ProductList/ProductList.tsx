"use client";

import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import cn from "@/utils/classNames";
import styles from "./ProductList.module.scss";
import type { ProductType } from "@/types/global";

type ProductListProps = {
  list: ProductType[];
  lastRef?: () => void;
};

export default function ProductList({ list, lastRef }: ProductListProps) {
  return (
    <div className={cn(styles.container)}>
      {list.map((item, idx) => (
        <Link
          href={`/product-detail/${item.id}`}
          key={item.id}
        >
          <ProductCard product={item} />
          <div ref={idx === list.length - 1 ? lastRef : null} />
        </Link>
      ))}
    </div>
  );
}

import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import cn from "@/utils/classNames";
import styles from "./ProductList.module.scss";
import type { ProductType } from "@/types/global";

type ProductListProps = {
  list: ProductType[];
};

export default function ProductList({ list }: ProductListProps) {
  return (
    <div className={cn(styles.container)}>
      {list.map((item) => (
        <Link
          href={`/product/${item.id}`}
          key={item.id}
        >
          <ProductCard product={item} />
        </Link>
      ))}
    </div>
  );
}

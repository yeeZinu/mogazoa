import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import cn from "@/utils/classNames";
import styles from "./UserProductList.module.scss";
import type { ProductType } from "@/types/global";

type ProductListProps = {
  list: ProductType[];
};

export default function UserProductList({ list }: ProductListProps) {
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

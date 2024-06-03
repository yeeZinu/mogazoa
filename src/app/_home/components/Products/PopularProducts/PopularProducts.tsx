import { ProductList } from "@/_home/components/Products/ProductList";
import { list } from "@/_home/mock";
import cn from "@/utils/classNames";
import styles from "./PopularProducts.module.scss";

export default function PopularProducts() {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.section)}>
        <h2 className={cn(styles.header)}>
          지금 핫한 상품 <span>TOP6</span>
        </h2>
        <ProductList list={list} />
      </div>
      <div className={cn(styles.section)}>
        <h2 className={cn(styles.header)}>별점이 높은 상품</h2>
        <ProductList list={list} />
      </div>
    </div>
  );
}

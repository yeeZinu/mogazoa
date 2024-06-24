import cn from "@/utils/classNames";
import styles from "./ShoppingSkeletonCard.module.scss";

export default function ShoppingSkeletonCard() {
  return (
    <div className={styles.container}>
      <div className={cn(styles.skeleton, styles.productImageBox)} />
      <div className={styles.description}>
        <div className={cn(styles.skeleton, styles.logoBox)} />
        <h2 className={cn(styles.skeleton, styles.name)}> </h2>
        <div className={cn(styles.skeleton, styles.priceBox)} />
      </div>
    </div>
  );
}

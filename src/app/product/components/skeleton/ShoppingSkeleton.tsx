"use client";

import styles from "./ShoppingSkeleton.module.scss";

import ShoppingSkeletonCard from "./ShoppingSkeletonCard";

const EMPTY = ["1", "2", "3", "4", "5", "6"];
export default function ShoppingSkeleton() {
  return (
    <section className={styles.container}>
      <div className={styles.layout}>
        {EMPTY.map((product) => (
          <ShoppingSkeletonCard key={product} />
        ))}
      </div>
      <div className={styles.layout}>
        {EMPTY.map((product) => (
          <ShoppingSkeletonCard key={product} />
        ))}
      </div>
    </section>
  );
}

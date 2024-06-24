"use client";

import cn from "@/utils/classNames";
import styles from "./ReviewCardSkeleton.module.scss";

export default function ReviewCardSkeleton() {
  return (
    <div className={styles.layout}>
      <div className={styles.mainBox}>
        <div className={styles.userBox}>
          <div className={cn(styles.skeleton, styles.user)} />
          <div className={cn(styles.skeleton, styles.description)}> </div>
        </div>
        <p className={cn(styles.skeleton, styles.reviewImage)}> </p>
      </div>
      <footer className={styles.footerBox}>
        <p className={cn(styles.skeleton, styles.createdAt)}> </p>
        <div className={cn(styles.skeleton, styles.thumb)}> </div>
      </footer>
    </div>
  );
}

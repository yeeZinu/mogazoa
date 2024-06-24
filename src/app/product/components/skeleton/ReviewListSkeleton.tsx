"use client";

import { useForm } from "react-hook-form";
import { Dropdown } from "@/components/Dropdown";
import { DROPDOWN, ORDER } from "@/components/Dropdown/constants";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import styles from "./ReviewListSkeleton.module.scss";

export default function ReviewListSkeleton({ reviewCount }: { reviewCount: number }) {
  const { control } = useForm({ mode: "onBlur" });
  const reviewList = Array(reviewCount <= 6 ? reviewCount : 6)
    .fill(0)
    .map((_, index) => index);

  return (
    <div>
      <div className={styles.headerBox}>
        <h2 className={styles.title}>상품 리뷰</h2>
        <Dropdown
          className={styles.dropDown}
          items={ORDER.REVIEW}
          control={control}
          name='order'
          variant={DROPDOWN.ORDER}
          placeholder={ORDER.REVIEW[0].option}
        />
      </div>

      <ul className={styles.layout}>
        {reviewList.map((review) => (
          <li key={review}>
            <ReviewCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

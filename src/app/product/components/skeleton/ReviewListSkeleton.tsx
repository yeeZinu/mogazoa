"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { Dropdown } from "@/components/Dropdown";
import { DROPDOWN, ORDER } from "@/components/Dropdown/constants";
import { ARROW_LEFT_ICON, ARROW_RIGHT_ICON } from "@/utils/constant";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import styles from "./ReviewListSkeleton.module.scss";

export default function ReviewListSkeleton({ reviewCount }: { reviewCount: number }) {
  const { control } = useForm({ mode: "onBlur" });
  const reviewList = Array(reviewCount <= 6 ? reviewCount : 6)
    .fill(0)
    .map((_, index) => index);

  return (
    <div>
      <Dropdown
        className={styles.dropDown}
        items={ORDER.REVIEW}
        control={control}
        name='order'
        variant={DROPDOWN.ORDER}
        placeholder={ORDER.REVIEW[0].option}
      />

      <ul className={styles.layout}>
        {reviewList.map((review) => (
          <li key={review}>
            <ReviewCardSkeleton />
          </li>
        ))}
      </ul>
      <div className={styles.buttonBox}>
        <Image
          className={styles.prev}
          src={ARROW_LEFT_ICON}
          alt='previous'
          width={45}
          height={45}
        />
        <Image
          className={styles.next}
          src={ARROW_RIGHT_ICON}
          alt='next'
          width={45}
          height={45}
        />
      </div>
    </div>
  );
}

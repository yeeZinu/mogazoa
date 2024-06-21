/* eslint-disable default-case */ // swtich(title) -> 여기 기본값을 안주기 위한 주석
/* eslint-disable react/require-default-props */ // type에 ? 연산자 추가하기 위한 주석
import Image from "next/image";
import React from "react";
import CategoryChip from "@/components/Chip/Category-chip/CategoryChip";
import { STAR_ACTIVE_ICON, BUBBLE_ICON } from "@/utils/constant";
import styles from "./Activity.module.scss";

type ActivityProps = {
  title: "남긴 별점 평균" | "남긴 리뷰" | "관심 카테고리";
  averageRating?: number;
  reviewCount?: number;
  chipCategoty?: MostFavoriteCategoryProps;
};

type MostFavoriteCategoryProps = {
  name: string;
  id: number;
};

export default function Activity({ title, averageRating, reviewCount, chipCategoty }: ActivityProps) {
  let changeImageSrc: string | undefined;
  let mainContent: number | undefined;
  let namgin: string | undefined;
  let namuji: string | undefined;

  if (title.length > 5) {
    namuji = title.slice(3);
    namgin = title.slice(0, 3);
  } else {
    namgin = title;
    namuji = "";
  }

  switch (title) {
    case "남긴 별점 평균":
      changeImageSrc = STAR_ACTIVE_ICON;
      mainContent = averageRating;
      break;
    case "남긴 리뷰":
      changeImageSrc = BUBBLE_ICON;
      mainContent = reviewCount;
      break;
  }

  return (
    <div className={styles.container}>
      <div className={styles.borderBox}>
        <div className={styles.title}>
          <span>{namgin}</span>
          <span>{namuji}</span>
        </div>
        {title === "관심 카테고리" ? (
          <CategoryChip>{chipCategoty?.name}</CategoryChip>
        ) : (
          <div className={styles.contentBox}>
            <figure className={styles.imageBox}>
              <Image
                src={changeImageSrc as string}
                alt='title'
                fill
              />
            </figure>
            <span>{mainContent?.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

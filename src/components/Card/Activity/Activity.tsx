/* eslint-disable default-case */ // swtich(title) -> 여기 기본값을 안주기 위한 주석
/* eslint-disable react/require-default-props */ // type에 ? 연산자 추가하기 위한 주석
import Image from "next/image";
import React from "react";
import Category from "@/components/Chip/Category/Category";
import { STAR_ACTIVE_ICON, SAVE_ICON, BUBBLE_ICON } from "@/utils/constant";
import styles from "./Activity.module.scss";

type ActivityProps = {
  title: "별점 평균" | "리뷰" | "카테고리";
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
  switch (title) {
    case "별점 평균":
      changeImageSrc = STAR_ACTIVE_ICON;
      mainContent = averageRating;
      break;
    case "리뷰":
      changeImageSrc = SAVE_ICON;
      mainContent = reviewCount;
      break;
    case "카테고리":
      changeImageSrc = BUBBLE_ICON;
      mainContent = chipCategoty?.id;
      break;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mobileBox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.contentBox}>
          <figure className={styles.imageBox}>
            <Image
              src={changeImageSrc as string}
              alt='title'
              fill
            />
          </figure>
          <span>{mainContent}</span>
        </div>
        <Category>전자기기</Category>
      </div>
    </div>
  );
}

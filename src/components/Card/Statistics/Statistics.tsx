/* eslint-disable default-case */
/* eslint-disable react/require-default-props */
import Image from "next/image";
import React from "react";
import { STAR_ACTIVE_ICON, SAVE_ICON, BUBBLE_ICON } from "@/utils/constant";
import styles from "./Statistics.module.scss";

type StatisticsProps = {
  title: "별점 평균" | "찜" | "리뷰";
  rating?: number;
  reviewCount?: number;
  favoriteCount?: number;
  categoryMetric?: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
};

export default function Statistics({ title, rating, reviewCount, favoriteCount, categoryMetric }: StatisticsProps) {
  let changeImageSrc: string | undefined;
  let mainContent: number | undefined;
  let compareItemResult: number | undefined;

  switch (title) {
    case "별점 평균":
      changeImageSrc = STAR_ACTIVE_ICON;
      mainContent = rating;
      compareItemResult = categoryMetric?.rating;
      break;
    case "찜":
      changeImageSrc = SAVE_ICON;
      mainContent = favoriteCount;
      compareItemResult = categoryMetric?.favoriteCount;
      break;
    case "리뷰":
      changeImageSrc = BUBBLE_ICON;
      mainContent = reviewCount;
      compareItemResult = categoryMetric?.reviewCount;
      break;
  }

  const isValidComparison = typeof mainContent === "number" && typeof compareItemResult === "number";

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <figure className={styles.contentBox}>
        <Image
          src={changeImageSrc as string}
          alt='title'
          width={24}
          height={24}
        />
        <span>{mainContent}</span>
      </figure>
      {isValidComparison ? (
        <span className={styles.description}>
          같은 카테고리 제품들보다 <br />
          <strong>{parseFloat(Math.abs(mainContent! - compareItemResult!).toFixed(1))}</strong> 더{" "}
          {mainContent! > compareItemResult! ? "높아" : "낮아"}요!
        </span>
      ) : (
        <span>비교할 수 없는 데이터입니다.</span>
      )}
    </div>
  );
}

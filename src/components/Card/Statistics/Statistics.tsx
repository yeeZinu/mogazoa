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
  compare: DataCompareProps;
};

type DataCompareProps = {
  rating?: number;
  favoriteCount?: number;
  reviewCount?: number;
};

export default function Statistics({ title, rating, reviewCount, favoriteCount, compare }: StatisticsProps) {
  let changeImageSrc: string | undefined;
  let mainContent: number | undefined;
  let compareItemResult: number | undefined;
  let compareResult: number | undefined;

  switch (title) {
    case "별점 평균":
      changeImageSrc = STAR_ACTIVE_ICON;
      mainContent = rating;
      compareItemResult = compare?.rating;
      compareResult = parseFloat(Math.abs(mainContent! - compareItemResult!).toFixed(1));
      break;
    case "찜":
      changeImageSrc = SAVE_ICON;
      mainContent = favoriteCount;
      compareItemResult = compare?.favoriteCount;
      compareResult = parseFloat(Math.abs(mainContent! - compareItemResult!).toFixed(0));
      break;
    case "리뷰":
      changeImageSrc = BUBBLE_ICON;
      mainContent = reviewCount;
      compareItemResult = compare?.reviewCount;
      compareResult = parseFloat(Math.abs(mainContent! - compareItemResult!).toFixed(0));
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
      </div>
      {title === "별점 평균" ? (
        <span className={styles.description}>
          같은 카테고리 제품들보다
          <strong> {compareResult}점 </strong>
          {mainContent! > compareItemResult! ? "높아" : "낮아"}요!
        </span>
      ) : (
        <span className={styles.description}>
          같은 카테고리 제품들보다
          <strong> {compareResult}개 </strong>
          {mainContent! > compareItemResult! ? "높아" : "낮아"}요!
        </span>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { STAR_ACTIVE_ICON, DEFAULT_PRODUCT_IMAGE } from "@/utils/constant";
import styles from "./Product.module.scss";

type ProductProps = {
  product: {
    name: string;
    reviewCount: number;
    favoriteCount: number;
    rating: number;
    image: string;
  };
};

export default function Product({ product }: ProductProps) {
  const { name, reviewCount, favoriteCount, rating, image: imageUrl } = product;

  const [isImageError, setIsImageError] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <Image
          src={isImageError ? DEFAULT_PRODUCT_IMAGE : imageUrl}
          fill
          alt={`${name}`}
          className={styles.image}
          onError={() => setIsImageError(true)}
        />
      </div>

      <div className={styles.infoBox}>
        <div className={styles.name}>{name}</div>
        <div className={styles.infoDetailBox}>
          <div className={styles.reviewFavorite}>
            <span>리뷰 {reviewCount}</span>
            <span>찜 {favoriteCount}</span>
          </div>

          <div className={styles.ratingBox}>
            <div className={styles.icon}>
              <Image
                src={STAR_ACTIVE_ICON}
                fill
                alt='별'
              />
            </div>
            <span className={styles.rating}>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

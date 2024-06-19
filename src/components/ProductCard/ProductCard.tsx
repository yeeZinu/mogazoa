"use client";

import Image from "next/image";
import { useState } from "react";
import { STAR_ACTIVE_ICON, DEFAULT_PRODUCT_IMAGE } from "@/utils/constant";
import styles from "./ProductCard.module.scss";
import type { ProductType } from "@/types/global";

type ProductProps = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductProps) {
  const { id, name, reviewCount, favoriteCount, rating, image: imageUrl } = product;

  const [isImageError, setIsImageError] = useState(false);

  return (
    <div
      key={id}
      className={styles.container}
    >
      <Image
        src={isImageError ? DEFAULT_PRODUCT_IMAGE : imageUrl}
        width={284}
        height={284}
        alt={`${name}`}
        className={styles.image}
        onError={() => setIsImageError(true)}
      />

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

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { NaverProduct } from "@/app/product/utils/types";
import { NAVER_LOGO } from "@/utils/constant";
import styles from "./NaverCard.module.scss";

export default function NaverCard({ product }: { product: NaverProduct }) {
  const { title, image, price, link } = product;
  const formattedTitle = title.length > 45 ? `${title.slice(0, 44)}...` : title;

  return (
    <a
      className={styles.container}
      href={link}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className={styles.productImageBox}>
        <img
          className={styles.productImage}
          src={image}
          alt='product'
        />
      </div>
      <div className={styles.description}>
        <div className={styles.logoBox}>
          <Image
            className={styles.naver}
            src={NAVER_LOGO}
            alt='naver'
            fill
          />
        </div>
        <h2 className={styles.name}>{formattedTitle}</h2>
        <p className={styles.price}>{price}원</p>
      </div>
    </a>
  );
}

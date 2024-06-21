/* eslint-disable @next/next/no-img-element */

import { NaverProduct } from "@/app/product/utils/types";
import styles from "./NaverCard.module.scss";

export default function NaverCard({ product }: { product: NaverProduct }) {
  const { title, image, price, link } = product;
  return (
    <a
      className={styles.container}
      href={link}
      target='_blank'
      rel='noopener noreferrer'
    >
      <img
        className={styles.productImage}
        src={image}
        alt='product'
      />
      <div className={styles.description}>
        <p className={styles.naver}>NAVER</p>
        <h2 className={styles.name}>{title}</h2>
        <p className={styles.price}>{price}원</p>
      </div>
    </a>
  );
}

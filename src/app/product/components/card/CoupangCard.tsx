/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { CoupangProduct } from "@/app/product/utils/types";
import { COUPANG_LOGO } from "@/utils/constant";
import styles from "./CoupangCard.module.scss";

export default function CoupnagCard({ product }: { product: CoupangProduct }) {
  const { title, image, price, link, rocketShippingImage, rocketGlobalImage } = product;
  const formattedTitle = title.length > 45 ? `${title.slice(0, 44)}...` : title;

  const rocketImage = rocketShippingImage || rocketGlobalImage || null;
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
            className={styles.coupangImage}
            src={COUPANG_LOGO}
            alt='coupang'
            fill
          />
        </div>
        <h2 className={styles.name}>{formattedTitle}</h2>
        <div className={styles.priceBox}>
          <p className={styles.price}>{price}원</p>
          {rocketImage && (
            <img
              className={styles.rocketImage}
              src={rocketImage}
              alt='rocket'
            />
          )}
        </div>
      </div>
    </a>
  );
}

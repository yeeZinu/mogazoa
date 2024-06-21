/* eslint-disable @next/next/no-img-element */

import { CoupangProduct } from "@/app/product/utils/types";
import styles from "./CoupangCard.module.scss";

export default function CoupnagCard({ product }: { product: CoupangProduct }) {
  const { title, image, price, link, rocketShippingImage, rocketGlobalImage } = product;
  const rocketImage = rocketShippingImage || rocketGlobalImage || null;
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
        <img
          className={styles.coupangImage}
          src='https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png'
          alt='coupang'
        />
        <h2 className={styles.name}>{title}</h2>
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

import Image from "next/image";
import React from "react";
import { CLOSE_ICON } from "@/utils/constant";
import styles from "./Compare.module.scss";

type CompareProps = {
  children: React.ReactNode;
};

export function Compare1({ children }: CompareProps) {
  return (
    <div className={styles.back}>
      <div className={`${styles.container} ${styles.compare1}`}>
        {children}
        <Image
          src={CLOSE_ICON}
          alt='close'
          width={18}
          height={18}
          className={styles.closeIcon}
        />
      </div>
    </div>
  );
}

export function Compare2({ children }: CompareProps) {
  return (
    <div className={styles.back}>
      <div className={`${styles.container} ${styles.compare2}`}>
        {children}
        <Image
          src={CLOSE_ICON}
          alt='close'
          width={18}
          height={18}
          className={styles.closeIcon}
        />
      </div>
    </div>
  );
}

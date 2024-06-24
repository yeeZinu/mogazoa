import Image from "next/image";
import React from "react";
import { CLOSE_ICON } from "@/utils/constant";
import styles from "./Compare.module.scss";

type CompareProps = {
  value: string;
  onRemove?: () => void;
  color?: boolean;
};

function Compare({ value, onRemove, color }: CompareProps) {
  return (
    <div className={styles.back}>
      <div className={`${styles.container} ${color ? styles.compare1 : styles.compare2}`}>
        {value}
        <Image
          src={CLOSE_ICON}
          alt='close'
          width={17}
          height={17}
          className={styles.closeIcon}
          onClick={onRemove}
        />
      </div>
    </div>
  );
}

export default Compare;

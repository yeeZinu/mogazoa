"use client";

import Image from "next/image";
import { THUMBS_UP_ACTIVE_ICON, THUMBS_UP_ICON } from "@/utils/constant";
import styles from "./Thumbs.module.scss";

type ThumbsProps = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

function Thumbs({ isActive, onClick, children }: ThumbsProps) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      type='button'
      className={isActive ? `${styles.container} ${styles.active}` : styles.container}
      onClick={handleClick}
    >
      <Image
        className={styles.image}
        src={isActive ? THUMBS_UP_ACTIVE_ICON : THUMBS_UP_ICON}
        alt='Thumbs Up'
        width={18}
        height={18}
      />
      {children}
    </button>
  );
}

export default Thumbs;

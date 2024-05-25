"use client";

import Image from "next/image";
import React, { useState } from "react";
import { THUMBS_UP_ACTIVE_ICON, THUMBS_UP_ICON } from "@/utils/constant";
import styles from "./Thumbs.module.scss";

type ThumbsProps = {
  onClick: () => void;
  children: React.ReactNode;
};

function Thumbs({ onClick, children }: ThumbsProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    onClick();
  };

  return (
    <button
      type='button'
      className={active ? `${styles.container} ${styles.active}` : styles.container}
      onClick={handleClick}
    >
      <Image
        src={active ? THUMBS_UP_ACTIVE_ICON : THUMBS_UP_ICON}
        alt='Thumbs Up'
        width={18}
        height={18}
      />
      {children}
    </button>
  );
}

export default Thumbs;

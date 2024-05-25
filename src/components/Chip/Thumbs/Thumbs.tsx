"use client";

import Image from "next/image";
import React, { useState } from "react";
import { THUMBS_UP_ACTIVE_ICON, THUMBS_UP_ICON } from "@/utils/constant";
import styles from "./Thumbs.module.scss";

type ThumbsProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

function Thumbs({ count, setCount }: ThumbsProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (active) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setActive(!active);
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
      {count}
    </button>
  );
}

export default Thumbs;

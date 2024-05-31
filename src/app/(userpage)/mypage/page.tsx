"use client";

import Link from "next/link";
import React from "react";
import cn from "@/utils/classNames";
import styles from "./MyPage.module.scss";

export default function MyPage() {
  return (
    <div className={cn(styles.container)}>
      <span>MyPage</span>
      <Link href='/otherpage/2'>이동 부탁</Link>
    </div>
  );
}

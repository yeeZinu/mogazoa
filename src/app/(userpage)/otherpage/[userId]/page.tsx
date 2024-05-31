"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import cn from "@/utils/classNames";
import styles from "./OtherPage.module.scss";

export default function OtherPage() {
  const userId = useSearchParams();

  return (
    <div className={cn(styles.container)}>
      <h1> OtherPage test </h1>
      <span>{userId}</span>
    </div>
  );
}

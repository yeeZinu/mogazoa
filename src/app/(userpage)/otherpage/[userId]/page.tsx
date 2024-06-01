"use client";

import { useParams } from "next/navigation";
import React from "react";
import cn from "@/utils/classNames";
import styles from "./OtherPage.module.scss";

export default function OtherPage() {
  // userId를 받아오는 useParams function
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className={cn(styles.container)}>
      <h1> OtherPage test </h1>
      <span>userId: {userId}</span>
    </div>
  );
}

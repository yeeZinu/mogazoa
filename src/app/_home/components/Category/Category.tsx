"use client";

import Image from "next/image";
import { ReactNode } from "react";
import cn from "@/utils/classNames";
import { CLOSE_ICON } from "@/utils/constant";
import styles from "./Category.module.scss";

type CategoryProps = {
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export default function Category({ isOpen, onToggle, children }: CategoryProps) {
  return (
    <div className={cn(styles.container, isOpen && styles.open)}>
      <Image
        className={cn(styles.closeButton)}
        src={CLOSE_ICON}
        width={18}
        height={18}
        alt='close'
        onClick={onToggle}
      />
      <div className={cn(styles.category)}>카테고리</div>
      {children}
    </div>
  );
}

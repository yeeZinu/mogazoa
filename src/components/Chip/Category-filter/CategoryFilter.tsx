import Image from "next/image";
import React from "react";
import { CATEGORY_ICON } from "@/utils/constant";
import styles from "./CategoryFilter.module.scss";

type CategoryFilterProps = {
  children: React.ReactNode;
};

function CategoryFilter({ children }: CategoryFilterProps) {
  return (
    <div className={styles.container}>
      <Image
        src={CATEGORY_ICON}
        alt='category'
        width={18}
        height={18}
      />
      {children}
    </div>
  );
}

export default CategoryFilter;

import Image from "next/image";
import React from "react";
import categoryImg from "@/images/category.svg";
import styles from "./CategoryFilter.module.scss";

type CategoryFilterProps = {
  children: React.ReactNode;
};

function CategoryFilter({ children }: CategoryFilterProps) {
  return (
    <div className={styles.container}>
      <Image
        src={categoryImg}
        alt='category'
        width={18}
        height={18}
      />
      {children}
    </div>
  );
}

export default CategoryFilter;

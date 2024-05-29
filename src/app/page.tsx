"use client";

import { useState } from "react";
import Category from "@/app/home/Category/Category";
import cn from "@/utils/classNames";
import styles from "./page.module.scss";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleCategorySelect = (category: null | string) => {
    setSelectedCategory(category);
  };

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <div className={styles.container}>
      <button
        type='button'
        className={cn(styles.categoryToggle)}
        onClick={toggleCategory}
      >
        {selectedCategory ?? "카테고리"}
      </button>
      <Category
        isOpen={isCategoryOpen}
        selected={selectedCategory}
        onToggle={toggleCategory}
        onSelect={handleCategorySelect}
      />
    </div>
  );
}

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Category from "@/app/_home/components/Category/Category";
import CategoryList from "@/app/_home/components/Category/CategoryList";
import Product from "@/app/_home/components/Product/Product";
import { ReviewerRanking } from "@/app/_home/components/ReviewerRanking";
import cn from "@/utils/classNames";
import createQueryString from "@/utils/createQueryString";
import styles from "./Main.module.scss";

type CategoryType = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Main({ categories }: { categories: CategoryType[] }) {
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleClick = (id: number, name: string) => {
    if (selectedCategory === name) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(name);
    }

    toggleCategory();

    router.push(`/?${createQueryString("category", id.toString(), searchParams)}`);
  };
  return (
    <div className={cn(styles.container)}>
      {/* <button
        type='button'
        className={cn(styles.categoryToggle)}
        onClick={toggleCategory}
      >
        {selectedCategory ?? "카테고리"}
      </button> */}
      <Category
        isOpen={isCategoryOpen}
        onToggle={toggleCategory}
      >
        <CategoryList
          selected={selectedCategory}
          onClick={handleClick}
          categoryList={categories}
        />
      </Category>

      <div className={styles.mainAndRightSide}>
        <Product />
        <ReviewerRanking />
      </div>
    </div>
  );
}

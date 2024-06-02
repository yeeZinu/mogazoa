"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Category from "@/app/_home/components/Category/Category";
import CategoryList from "@/app/_home/components/Category/CategoryList";
import FilteredProducts from "@/app/_home/components/Products/FilteredProducts/FilteredProducts";
import PopularProduct from "@/app/_home/components/Products/PopularProducts/PopularProducts";
import { ReviewerRanking } from "@/app/_home/components/ReviewerRanking";
import cn from "@/utils/classNames";
import { createQueryString, deleteQueryString } from "@/utils/createQueryString";
import styles from "./Main.module.scss";

type CategoryType = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Main({ categories }: { categories: CategoryType[] }) {
  const [selectedCategory, setSelectedCategory] = useState<null | Pick<CategoryType, "id" | "name">>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleClick = (id: number, name: string) => {
    if (selectedCategory?.name === name) {
      setSelectedCategory(null);
      router.push(`/?${deleteQueryString("category", searchParams)}`);
    } else {
      setSelectedCategory({ id, name });
      router.push(`/?${createQueryString("category", id.toString(), searchParams)}`);
    }

    toggleCategory();
  };

  const hasQueryParams = Array.from(searchParams.entries()).length > 0;
  const category = searchParams.get("category");

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
          selected={category}
          onClick={handleClick}
          categoryList={categories}
        />
      </Category>

      <div className={styles.mainAndRightSide}>
        {hasQueryParams ? <FilteredProducts selectedCategory={selectedCategory?.name ?? null} /> : <PopularProduct />}
        <ReviewerRanking />
      </div>
    </div>
  );
}

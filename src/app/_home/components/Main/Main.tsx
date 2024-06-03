"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Category from "@/app/_home/components/Category/Category";
import CategoryList from "@/app/_home/components/Category/CategoryList";
import FilteredProducts from "@/app/_home/components/Products/FilteredProducts/FilteredProducts";
import PopularProduct from "@/app/_home/components/Products/PopularProducts/PopularProducts";
import { ReviewerRanking } from "@/app/_home/components/ReviewerRanking";
import { QUERY } from "@/app/_home/constants";
import CategoryFilter from "@/components/Chip/Category-filter/CategoryFilter";
import cn from "@/utils/classNames";
import { createQueryString, deleteQueryString } from "@/utils/createQueryString";
import styles from "./Main.module.scss";
import type { CategoryType } from "@/app/_home/types";
import type { UserRankingType } from "@/types/global";

type MainProps = {
  categories: CategoryType[];
  ranking: UserRankingType[];
};

export default function Main({ categories, ranking }: MainProps) {
  const [selectedCategory, setSelectedCategory] = useState<null | Pick<CategoryType, "id" | "name">>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategoryClick = (id: number, name: string) => {
    if (selectedCategory?.name === name) {
      setSelectedCategory(null);
      router.push(`/?${deleteQueryString(QUERY.CATEGORY, searchParams)}`);
    } else {
      setSelectedCategory({ id, name });
      router.push(`/?${createQueryString(QUERY.CATEGORY, id.toString(), searchParams)}`);
    }

    toggleCategory();
  };

  const hasQueryParams = Array.from(searchParams.entries()).length > 0;
  const category = searchParams.get(QUERY.CATEGORY);

  return (
    <div className={cn(styles.container)}>
      <Category
        isOpen={isCategoryOpen}
        onToggle={toggleCategory}
      >
        <CategoryList
          selected={category}
          onClick={handleCategoryClick}
          categoryList={categories}
        />
      </Category>

      <div className={styles.content}>
        {hasQueryParams ? <FilteredProducts selectedCategory={selectedCategory?.name ?? null} /> : <PopularProduct />}
        <button
          type='button'
          className={cn(styles.categoryToggle)}
          onClick={toggleCategory}
        >
          <CategoryFilter>{selectedCategory?.name ?? "카테고리"}</CategoryFilter>
        </button>

        <ReviewerRanking ranking={ranking} />
      </div>
    </div>
  );
}

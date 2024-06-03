"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Category, CategoryList } from "@/_home/components/Category";
import { PopularProducts, FilteredProducts } from "@/_home/components/Products";
import { ReviewerRanking } from "@/_home/components/ReviewerRanking";
import { QUERY } from "@/_home/constants";
import CategoryFilter from "@/components/Chip/Category-filter/CategoryFilter";
import cn from "@/utils/classNames";
import { createQueryString, deleteQueryString } from "@/utils/createQueryString";
import styles from "./Main.module.scss";
import type { CategoryType } from "@/_home/types";
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
        {hasQueryParams ? <FilteredProducts selectedCategory={selectedCategory?.name ?? null} /> : <PopularProducts />}
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

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { Category, CategoryList } from "@/_home/components/Category";
import { PopularProducts, FilteredProducts } from "@/_home/components/Products";
import { ReviewerRanking } from "@/_home/components/ReviewerRanking";
import { QUERY } from "@/_home/constants";
import CategoryFilter from "@/components/Chip/Category-filter/CategoryFilter";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { NoData } from "@/components/NoData";
import cn from "@/utils/classNames";
import { createQueryString, deleteQueryString } from "@/utils/createQueryString";
import styles from "./Main.module.scss";
import type { UserRankingType, ProductsResponseType, CategoryType } from "@/types/global";

type MainProps = {
  categories: CategoryType[];
  ranking: UserRankingType[];
  products: { hotProducts: ProductsResponseType; ratingProducts: ProductsResponseType };
};

export default function Main({ categories, ranking, products }: MainProps) {
  const [selectedCategory, setSelectedCategory] = useState<null | Pick<CategoryType, "id" | "name">>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { hotProducts, ratingProducts } = products;

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

    setIsCategoryOpen(false);
  };

  useEffect(() => {
    if (isCategoryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCategoryOpen]);

  const hasQueryParams = Array.from(searchParams.entries()).length > 0;
  const categoryParam = searchParams.get(QUERY.CATEGORY);
  const category = categories.find(({ id }) => categoryParam === id.toString())?.name;

  return (
    <div className={cn(styles.container)}>
      <Category
        isOpen={isCategoryOpen}
        onToggle={toggleCategory}
      >
        <CategoryList
          selected={categoryParam}
          onClick={handleCategoryClick}
          categoryList={categories}
        />
      </Category>

      <div className={styles.content}>
        <div className={styles.productList}>
          {hasQueryParams ? (
            <ErrorBoundary>
              <Suspense fallback={<NoData message='Loading...' />}>
                <FilteredProducts category={category ?? null} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <PopularProducts
              hotProducts={hotProducts.list.slice(0, 6)}
              ratingProducts={ratingProducts.list.slice(0, 6)}
            />
          )}
          <button
            type='button'
            className={cn(styles.categoryToggle)}
            onClick={toggleCategory}
          >
            <CategoryFilter>{category ?? "카테고리"}</CategoryFilter>
          </button>
        </div>

        <ReviewerRanking ranking={ranking.slice(0, 5)} />
      </div>
    </div>
  );
}

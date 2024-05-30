"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Category from "@/app/home/Category/Category";
import CategoryList from "@/app/home/Category/CategoryList";
import cn from "@/utils/classNames";
import createQueryString from "@/utils/createQueryString";
import styles from "./ProductCategory.module.scss";

type CategoryType = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function ProductCategory({ categories }: { categories: CategoryType[] }) {
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
    <>
      <button
        type='button'
        className={cn(styles.categoryToggle)}
        onClick={toggleCategory}
      >
        {selectedCategory ?? "카테고리"}
      </button>
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
    </>
  );
}

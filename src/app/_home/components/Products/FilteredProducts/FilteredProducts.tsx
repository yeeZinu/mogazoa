"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProductList } from "@/_home/components/Products/ProductList";
import { QUERY } from "@/_home/constants";
import { list } from "@/_home/mock";
import { Dropdown } from "@/components/Dropdown";
import { ORDER, DROPDOWN } from "@/components/Dropdown/constants";
import cn from "@/utils/classNames";
import { createQueryString } from "@/utils/createQueryString";
import styles from "./FilteredProducts.module.scss";

type FilteredProductsProps = {
  selectedCategory: string | null;
};

export default function FilteredProducts({ selectedCategory }: FilteredProductsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get(QUERY.CATEGORY);
  const keyword = searchParams.get(QUERY.KEYWORD);

  const { control, watch } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (watch("order")) {
      router.push(`/?${createQueryString(QUERY.ORDER, watch("order"), searchParams)}`);
    }
  }, [watch("order")]);

  let filteringText = "";

  if (category && keyword) {
    filteringText = `${selectedCategory} 카테고리의 ${keyword}로 검색한 상품`;
  } else if (keyword) {
    filteringText = `${keyword}로 검색한 상품`;
  } else if (category) {
    filteringText = `${selectedCategory}의 모든 상품`;
  }

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.content)}>
        <div className={cn(styles.header)}>
          <h2 className={cn(styles.headerText)}>{filteringText}</h2>
          <Dropdown
            items={ORDER.PRODUCT}
            control={control}
            name='order'
            variant={DROPDOWN.ORDER}
            placeholder={ORDER.PRODUCT[0].option}
          />
        </div>

        <ProductList list={list} />
      </div>
    </div>
  );
}

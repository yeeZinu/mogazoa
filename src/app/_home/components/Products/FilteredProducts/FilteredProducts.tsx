"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProductList } from "@/app/_home/components/Products/ProductList";
import { list } from "@/app/_home/mock";
import { Dropdown } from "@/components/Dropdown";
import { ORDER, DROPDOWN } from "@/components/Dropdown/constants";
import cn from "@/utils/classNames";
import styles from "./FilteredProducts.module.scss";

type FilteredProductsProps = {
  selectedCategory: string | null;
};

export default function FilteredProducts({ selectedCategory }: FilteredProductsProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const { control } = useForm({ mode: "onBlur" });

  let filteringText = "";

  if (category && search) {
    filteringText = `${selectedCategory} 카테고리의 ${search}로 검색한 상품`;
  } else if (search) {
    filteringText = `${search}로 검색한 상품`;
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
            name='sort'
            variant={DROPDOWN.ORDER}
            placeholder={ORDER.PRODUCT[0].option}
          />
        </div>

        <ProductList list={list} />
      </div>
    </div>
  );
}

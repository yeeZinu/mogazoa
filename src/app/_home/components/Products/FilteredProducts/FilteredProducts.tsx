"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { ProductList } from "@/_home/components/Products/ProductList";
import { QUERY } from "@/_home/constants";
import { useGetFilteredProducts } from "@/_home/hooks/useGetFilteredProducts";
import { useQueryParams } from "@/app/_home/hooks/useQueryParams";
import { Dropdown } from "@/components/Dropdown";
import { ORDER, DROPDOWN } from "@/components/Dropdown/constants";
import cn from "@/utils/classNames";
import { createQueryString } from "@/utils/createQueryString";
import styles from "./FilteredProducts.module.scss";

type FilteredProductsProps = {
  category: string | null;
};

export default function FilteredProducts({ category }: FilteredProductsProps) {
  const { ref, inView } = useInView();

  const searchParams = useSearchParams();
  const router = useRouter();

  const paramsObj = useQueryParams();
  const params = new URLSearchParams(paramsObj);

  const { data: productData, fetchNextPage, hasNextPage } = useGetFilteredProducts(params.toString());

  const { control } = useForm({ mode: "onBlur" });
  const order = useWatch({ control, name: "order" });

  useEffect(() => {
    if (order) {
      router.push(`/?${createQueryString(QUERY.ORDER, order, searchParams)}`);
    }
  }, [order, router, searchParams]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  let filteringText = "";

  const keyword = searchParams.get(QUERY.KEYWORD);

  if (keyword && category) {
    filteringText = `${category} 카테고리의 ${keyword}로 검색한 상품`;
  } else if (keyword) {
    filteringText = `${keyword}로 검색한 상품`;
  } else if (category) {
    filteringText = `${category}의 모든 상품`;
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

        {productData && (
          <ProductList
            list={productData}
            lastRef={ref}
          />
        )}
      </div>
    </div>
  );
}

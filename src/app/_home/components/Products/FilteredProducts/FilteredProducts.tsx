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
import { NoData } from "@/components/NoData";
import cn from "@/utils/classNames";
import { createQueryString } from "@/utils/createQueryString";
import styles from "./FilteredProducts.module.scss";
import FilteringText from "./FilteringText";

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

  const keyword = searchParams.get(QUERY.KEYWORD);

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.header)}>
        <FilteringText
          category={category}
          keyword={keyword}
        />
        <Dropdown
          items={ORDER.PRODUCT}
          control={control}
          name='order'
          variant={DROPDOWN.ORDER}
          placeholder={ORDER.PRODUCT[0].option}
        />
      </div>

      {productData.length !== 0 ? (
        <ProductList
          list={productData}
          lastRef={ref}
        />
      ) : (
        <div className={styles.noProduct}>
          <NoData message='등록된 상품이 없습니다.' />
        </div>
      )}
    </div>
  );
}

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { Dropdown } from "@/components/Dropdown";
import { ORDER, DROPDOWN } from "@/components/Dropdown/constants";
import useWindowSize from "@/hooks/useWindowSize";
import { ProductType, ProductsResponseType } from "@/types/global";
import cn from "@/utils/classNames";
import HttpClient from "@/utils/httpClient";
import styles from "./UserActivityList.module.scss";
// eslint-disable-next-line no-restricted-imports
import TabButton from "../TabButton/TabButton";
// eslint-disable-next-line no-restricted-imports
import UserProductList from "../UserProductList/UserProductList";

export default function UserActivityList() {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState<string>("reviewed");
  const { data: session } = useSession();
  const { width } = useWindowSize();
  const { control, watch } = useForm({ mode: "onBlur" });

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const httpClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL!);
  const userId = session?.user.id;
  const ACCESS_TOKEN = session?.accessToken ?? "";

  const querySelectButton = (value: string) => {
    const params = new URLSearchParams();
    params.set("order", value);

    return params.toString();
  };

  const {
    data: userProductData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["userProductData", selectedButton],
    queryFn: async ({ pageParam }) => {
      const res = await httpClient.get<ProductsResponseType>(
        `users/${userId}/${selectedButton}-products?cursor=${pageParam}`,
        {
          headers: { Authorization: ACCESS_TOKEN },
          cache: "no-cache",
        },
      );
      return res;
    },
    select: (data): ProductType[] => data.pages.map((page) => page.list).flat(),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const selectTab = ORDER.PROFILE.filter((i) => i.value === selectedButton);
  console.log("selectedButton", typeof selectedButton);

  console.log("selectTab", width, selectTab);

  useEffect(() => {
    if (width <= 1023 && watch("select") === undefined) {
      setSelectedButton("reviewed");
    }
    if (width <= 1023 && watch("select") !== undefined) {
      setSelectedButton(watch("select"));
    }

    if (inView && hasNextPage) {
      fetchNextPage();
    }
    router.push(`${userId}/?${querySelectButton(selectedButton)}`);
  }, [inView, fetchNextPage, hasNextPage, watch("select"), selectedButton]);

  const onSelectButtonHandler = (value: string) => {
    setSelectedButton(value);
  };

  return (
    <div className={cn(styles.container)}>
      {width > 1023 ? (
        <TabButton
          onSelectButton={onSelectButtonHandler}
          button={selectedButton}
        />
      ) : (
        <div>
          <Dropdown
            items={ORDER.PROFILE}
            control={control}
            name='select'
            variant={DROPDOWN.ORDER}
            placeholder={
              ORDER.PROFILE[0].option !== selectTab[0].option ? selectTab[0].option : ORDER.PROFILE[0].option
            }
          />
        </div>
      )}
      {userProductData && (
        <UserProductList
          list={userProductData}
          lastRef={ref}
        />
      )}
    </div>
  );
}

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { productMock } from "@/app/(userpage)/productMock";
import { Dropdown } from "@/components/Dropdown";
import { ORDER, DROPDOWN } from "@/components/Dropdown/constants";
import useWindowSize from "@/hooks/useWindowSize";
import cn from "@/utils/classNames";
import HttpClient from "@/utils/httpClient";
import styles from "./UserActivityList.module.scss";
// eslint-disable-next-line no-restricted-imports
import TabButton from "../TabButton/TabButton";
// eslint-disable-next-line no-restricted-imports
import UserProductList from "../UserProductList/UserProductList";

export default function UserActivityList() {
  const [selectedButton, setSelectedButton] = useState<string>("reviewed");
  const { data: session } = useSession();
  const { width } = useWindowSize();
  const { control, watch } = useForm({ mode: "onBlur" });

  const httpClient = new HttpClient(process.env.NEXT_PUBLIC_BASE_URL!);
  const userId = session?.user.id;
  const ACCESS_TOKEN = session?.accessToken ?? "";

  const { data } = useInfiniteQuery({
    queryKey: ["userProductData", selectedButton],
    queryFn: async ({ pageParam }) => {
      const res = await httpClient.get(`users/${userId}/${selectedButton}-products?cursor=${pageParam}`, {
        headers: { Authorization: ACCESS_TOKEN },
        cache: "no-cache",
      });
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  console.log("select", selectedButton, data);

  useEffect(() => {
    if (watch("select") !== undefined) {
      setSelectedButton(watch("select"));
    }
    setSelectedButton("reviewed");
  }, [watch("select")]);

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
            placeholder={ORDER.PROFILE[0].option}
          />
        </div>
      )}
      <UserProductList list={productMock} />
    </div>
  );
}

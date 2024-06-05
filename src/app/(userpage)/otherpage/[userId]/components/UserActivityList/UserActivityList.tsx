import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { productMock } from "@/app/(userpage)/productMock";
import { Dropdown } from "@/components/Dropdown";
import { ORDER, DROPDOWN } from "@/components/Dropdown/constants";
import useWindowSize from "@/hooks/useWindowSize";
import cn from "@/utils/classNames";
import styles from "./UserActivityList.module.scss";
// eslint-disable-next-line no-restricted-imports
import TabButton from "../TabButton/TabButton";
// eslint-disable-next-line no-restricted-imports
import UserProductList from "../UserProductList/UserProductList";

export default function UserActivityList() {
  const [selectedButton, setSelectedButton] = useState<string>("reviewed");
  const { width } = useWindowSize();
  const { control, watch } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (watch("select")) {
      console.log("바뀜", watch("select"));
    }
  }, [watch("select")]);

  const onSelectButtonHandler = (value: string) => {
    setSelectedButton(value);
  };

  return (
    <div className={cn(styles.container)}>
      {width > 768 ? (
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

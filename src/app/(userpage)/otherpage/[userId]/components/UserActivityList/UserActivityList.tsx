import React, { useState } from "react";
import { productMock } from "@/app/(userpage)/productMock";
import cn from "@/utils/classNames";
import styles from "./UserActivityList.module.scss";
// eslint-disable-next-line no-restricted-imports
import UserProductList from "../UserProductList/UserProductList";

export default function UserActivityList() {
  const [button, setButton] = useState<string>("reviewed");

  return (
    <div className={styles.container}>
      <div className={cn(styles.buttonBox)}>
        <div
          className={cn(styles.selectButton, styles[`${button === "reviewed" ? "active" : ""}`])}
          onClick={() => {
            setButton("reviewed");
          }}
          onKeyDown={() => setButton("reviewed")}
          role='button'
          tabIndex={0}
        >
          리뷰 남긴 상품
        </div>
        <div
          className={cn(styles.selectButton, styles[`${button === "created" ? "active" : ""}`])}
          onClick={() => {
            setButton("created");
          }}
          onKeyDown={() => setButton("created")}
          role='button'
          tabIndex={0}
        >
          등록한 상품
        </div>
        <div
          className={cn(styles.selectButton, styles[`${button === "favorite" ? "active" : ""}`])}
          onClick={() => {
            setButton("favorite");
          }}
          onKeyDown={() => setButton("favorite")}
          role='button'
          tabIndex={0}
        >
          찜한 상품
        </div>
      </div>
      <UserProductList list={productMock} />
    </div>
  );
}

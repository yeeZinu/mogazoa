import React, { HTMLAttributes } from "react";
import styles from "./CategoryChip.module.scss";

type CategoryProps = {
  children?: keyof typeof CATEGORY_TYPE;
} & HTMLAttributes<HTMLDivElement>;

type CategoryType<T extends string> = {
  [key in T]: { style: string };
};

export const CATEGORY_TYPE: CategoryType<string> = {
  음악: { style: "yellow" },
  "영화/드라마": { style: "red" },
  "강의/책": { style: "purple" },
  호텔: { style: "green" },
  "가구/인테리어": { style: "pink" },
  식당: { style: "orange" },
  전자기기: { style: "mint" },
  화장품: { style: "hotpink" },
  "의류/악세서리": { style: "navy" },
  앱: { style: "blue" },
  default: { style: "default" },
};

function CategoryChip({ children, ...rest }: CategoryProps) {
  const typeCheck = children ?? "default";

  return (
    <div
      className={`${styles[CATEGORY_TYPE[typeCheck]?.style] ?? styles.default} ${styles.container}`}
      {...rest}
    >
      <div>{children}</div>
    </div>
  );
}

export default CategoryChip;

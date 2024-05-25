import React, { HTMLAttributes } from "react";
import styles from "./Category.module.scss";

type CategoryProps = {
  children?: keyof typeof CATEGORY_TYPE;
} & HTMLAttributes<HTMLDivElement>;

type CategoryType<T extends string> = {
  [key in T]: { style: string };
};

const CATEGORY_TYPE: CategoryType<string> = {
  음악: { style: "music" },
  "영화/드라마": { style: "movie" },
  "강의/책": { style: "study" },
  호텔: { style: "hotel" },
  "가구/인테리어": { style: "furniture" },
  식당: { style: "restaurant" },
  전자기기: { style: "electronics" },
  화장품: { style: "cosmetics" },
  "의류/악세서리": { style: "clothes" },
  앱: { style: "app" },
  default: { style: "default" },
};

function Category({ children, ...rest }: CategoryProps) {
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

Category.defaultProps = {
  children: "default",
};

export default Category;

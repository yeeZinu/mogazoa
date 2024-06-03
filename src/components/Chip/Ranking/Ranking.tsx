import React, { HTMLAttributes } from "react";
import styles from "./Ranking.module.scss";

type RankingProps = {
  children?: keyof typeof RANKING_TYPE;
} & HTMLAttributes<HTMLDivElement>;

type RankingType<T extends string> = {
  [key in T]: { style: string };
};

const RANKING_TYPE: RankingType<string> = {
  1: { style: "first" },
  2: { style: "second" },
  3: { style: "third" },
  4: { style: "third" },
  5: { style: "third" },
  default: { style: "default" },
};

function Ranking({ children, ...rest }: RankingProps) {
  const typeCheck = children ?? "default";

  return (
    <div
      className={`${styles[RANKING_TYPE[typeCheck]?.style] ?? styles.default} ${styles.container}`}
      {...rest}
    >
      <div>{children}등</div>
    </div>
  );
}

export default Ranking;

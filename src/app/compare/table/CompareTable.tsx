import React from "react";
import styles from "./CompareTable.module.scss";

type Product = {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
};

type CompareTableProps = {
  product1: Product;
  product2: Product;
};

const CompareTable: React.FC<CompareTableProps> = ({ product1, product2 }) => {
  const compareProducts = () => {
    const criteria = [
      { name: "절대 별점", product1: product1.rating, product2: product2.rating },
      { name: "절대 찜 개수", product1: product1.favoriteCount, product2: product2.favoriteCount },
      { name: "리뷰 개수", product1: product1.reviewCount, product2: product2.reviewCount },
    ];

    return criteria.map((criterion) => {
      let result = "";
      if (criterion.product1 > criterion.product2) {
        result = "상품 1 승리";
      } else if (criterion.product1 < criterion.product2) {
        result = "상품 2 승리";
      } else {
        result = "무승부";
      }

      return (
        <tr
          className={styles.tr}
          key={criterion.name}
        >
          <td className={`${styles.td} ${styles.name}`}>{criterion.name}</td>
          <td className={styles.td}>{criterion.product1}</td>
          <td className={styles.td}>{criterion.product2}</td>
          <td className={`${result.includes("승리") ? styles.winner : styles.draw} ${styles.td}`}>{result}</td>
        </tr>
      );
    });
  };

  const isProduct1Winner = product1.rating > product2.rating;

  return (
    <div className={styles.compare}>
      <div className={styles.resultBox}>
        <div className={styles.result}>
          <div>
            <span className={`${styles.colorText} ${isProduct1Winner ? styles.winnerText : ""}`}>{product1.name}</span>
            상품이
          </div>
          <div>승리하였습니다!</div>
        </div>
        <div className={styles.reason}>6가지 항목 중 3가지 항목에서 우세합니다.</div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.trHead}>
            <th className={styles.th}>기준</th>
            <th className={styles.th}>상품 1</th>
            <th className={styles.th}>상품 2</th>
            <th className={styles.th}>결과</th>
          </tr>
        </thead>
        <tbody>{compareProducts()}</tbody>
      </table>
    </div>
  );
};

export default CompareTable;

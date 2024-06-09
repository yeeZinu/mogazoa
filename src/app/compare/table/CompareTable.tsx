import React from "react";
import styles from "./CompareTable.module.scss";

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  isFavorite: boolean;
  category: {
    id: number;
    name: string;
  };
  categoryMetric: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
};

type CompareTableProps = {
  product1: Product;
  product2: Product;
};

const CompareTable: React.FC<CompareTableProps> = ({ product1, product2 }) => {
  const compareProducts = () => {
    const criteria = [
      { name: "절대 별점", product1: product1.rating, product2: product2.rating },
      { name: "상대 별점", product1: product1.categoryMetric.rating, product2: product2.categoryMetric.rating },
      { name: "절대 찜 개수", product1: product1.favoriteCount, product2: product2.favoriteCount },
      {
        name: "상대 찜 개수",
        product1: product1.categoryMetric.favoriteCount,
        product2: product2.categoryMetric.favoriteCount,
      },
      { name: "절대 조회수", product1: product1.reviewCount, product2: product2.reviewCount },
      {
        name: "상대 조회수",
        product1: product1.categoryMetric.reviewCount,
        product2: product2.categoryMetric.reviewCount,
      },
    ];

    let product1Wins = 0;
    let product2Wins = 0;

    const rows = criteria.map((criterion) => {
      let result = "";
      let resultClass = "";
      if (criterion.product1 > criterion.product2) {
        result = "상품 1 승리";
        resultClass = styles.winner;
        product1Wins += 1;
      } else if (criterion.product1 < criterion.product2) {
        result = "상품 2 승리";
        resultClass = styles.loser;
        product2Wins += 1;
      } else {
        result = "무승부";
        resultClass = styles.draw;
      }

      return (
        <tr
          className={styles.tr}
          key={criterion.name}
        >
          <td className={`${styles.td} ${styles.name}`}>{criterion.name}</td>
          <td className={styles.td}>{criterion.product1}</td>
          <td className={styles.td}>{criterion.product2}</td>
          <td className={`${resultClass} ${styles.td}`}>{result}</td>
        </tr>
      );
    });

    let overallResult = "";
    let winningProduct = "";
    let resultClass = "";
    if (product1Wins > product2Wins) {
      overallResult = "상품이 승리하였습니다!";
      winningProduct = product1.name;
      resultClass = styles.winnerText;
    } else if (product1Wins < product2Wins) {
      overallResult = "상품이 승리하였습니다!";
      winningProduct = product2.name;
      resultClass = styles.loserText;
    } else {
      overallResult = "무승부입니다!";
      resultClass = styles.drawText;
    }

    return { rows, overallResult, winningProduct, resultClass, product1Wins, product2Wins };
  };

  const { rows, overallResult, winningProduct, resultClass, product1Wins, product2Wins } = compareProducts();

  return (
    <div className={styles.compare}>
      <div className={styles.resultBox}>
        <div className={styles.result}>
          <div>
            <span className={`${styles.colorText} ${resultClass}`}>{winningProduct}</span> {overallResult}
          </div>
        </div>
        <div className={styles.reason}>
          6가지 항목 중 {Math.max(product1Wins, product2Wins)}가지 항목에서 우세합니다.
        </div>
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
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default CompareTable;

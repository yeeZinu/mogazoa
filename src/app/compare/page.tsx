"use client";

import Image from "next/image";
import React, { useState } from "react";
import { LOADING_LARGE_IMAGE } from "@/utils/constant";
import styles from "./compare.module.scss";

function ComparePage() {
  const [compare, setCompare] = useState(false);

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <div>
          <div className={styles.text}>상품 1</div>
          <input
            type='search'
            className={styles.input}
            placeholder='상품명을 입력하세요.'
          />
        </div>
        <div>
          <div className={styles.text}>상품 2</div>
          <input
            type='search'
            className={styles.input}
            placeholder='상품명을 입력하세요.'
          />
        </div>
        <button
          type='button'
          className={styles.button}
          onClick={() => setCompare(!compare)}
        >
          비교하기
        </button>
      </div>
      {compare ? (
        <div className={styles.compare}>
          <div className={styles.resultBox}>
            <div className={styles.result}>
              <div>
                <span className={styles.colorText}>Air Pods Max</span> 상품이
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
            <tbody>
              <tr className={styles.tr}>
                <td className={`${styles.td} ${styles.name}`}>절대 별점</td>
                <td className={styles.td}>4.8</td>
                <td className={styles.td}>4.9</td>
                <td className={`${styles.loser} ${styles.td}`}>상품 2 승리</td>
              </tr>
              <tr className={styles.tr}>
                <td className={`${styles.td} ${styles.name}`}>상대 별점</td>
                <td className={styles.td}>+1.5</td>
                <td className={styles.td}>+2.5</td>
                <td className={`${styles.loser} ${styles.td}`}>상품 2 승리</td>
              </tr>
              <tr className={styles.tr}>
                <td className={`${styles.td} ${styles.name}`}>절대 찜 개수</td>
                <td className={styles.td}>13,580</td>
                <td className={styles.td}>1,560</td>
                <td className={`${styles.winner} ${styles.td}`}>상품 1 승리</td>
              </tr>
              <tr className={styles.tr}>
                <td className={`${styles.td} ${styles.name}`}>상대 찜 개수</td>
                <td className={styles.td}>-150</td>
                <td className={styles.td}>+185</td>
                <td className={`${styles.loser} ${styles.td}`}>상품 2 승리</td>
              </tr>
              <tr className={styles.tr}>
                <td className={`${styles.td} ${styles.name}`}>절대 조회수</td>
                <td className={styles.td}>13,580</td>
                <td className={styles.td}>1,560</td>
                <td className={`${styles.winner} ${styles.td}`}>상품 1 승리</td>
              </tr>
              <tr className={styles.tr}>
                <td className={`${styles.td} ${styles.name}`}>상대 조회수</td>
                <td className={styles.td}>+113</td>
                <td className={styles.td}>+113</td>
                <td className={`${styles.draw} ${styles.td}`}>무승부</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.loading}>
          <Image
            src={LOADING_LARGE_IMAGE}
            alt='loading'
            width={87}
            height={84}
          />
        </div>
      )}
    </div>
  );
}

export default ComparePage;

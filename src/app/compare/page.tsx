"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Compare } from "@/components/Chip/Compare/Compare";
import { LOADING_LARGE_IMAGE } from "@/utils/constant";
import styles from "./compare.module.scss";

function ComparePage() {
  const [compare, setCompare] = useState(false);
  const [chips, setChips] = useState<{ product1: string; product2: string }>({ product1: "", product2: "" });
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("chips", JSON.stringify(chips));
  }, [chips]);

  const handleKeyDown = (product: "product1" | "product2") => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value !== "") {
        setChips((prevChips) => ({ ...prevChips, [product]: value }));
        if (product === "product1") {
          setInputValue1("");
          if (inputRef1.current) {
            inputRef1.current.blur();
          }
        } else {
          setInputValue2("");
          if (inputRef2.current) {
            inputRef2.current.blur();
          }
        }
      }
    }
  };
  const removeChip = (product: "product1" | "product2") => () => {
    setChips((prevChips) => {
      const newChips = { ...prevChips, [product]: undefined };
      window.localStorage.setItem("chips", JSON.stringify(newChips));
      return newChips;
    });
  };

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <div>
          <div className={styles.text}>상품 1</div>
          <div className={styles.inputBox}>
            <div className={styles.compareChip}>
              {!isFocused1 && chips.product1 && (
                <Compare
                  value={chips.product1}
                  onRemove={removeChip("product1")}
                  color
                />
              )}
            </div>
            <input
              ref={inputRef1}
              type='search'
              className={styles.input}
              value={inputValue1}
              onKeyDown={handleKeyDown("product1")}
              onChange={(e) => setInputValue1(e.target.value)}
              onFocus={() => setIsFocused1(true)}
              onBlur={() => setIsFocused1(false)}
            />
          </div>
        </div>
        <div>
          <div className={styles.text}>상품 2</div>
          <div className={styles.inputBox}>
            <div className={styles.compareChip}>
              {!isFocused2 && chips.product2 && (
                <Compare
                  value={chips.product2}
                  onRemove={removeChip("product2")}
                />
              )}
            </div>
            <input
              ref={inputRef2}
              type='search'
              className={styles.input}
              value={inputValue2}
              onKeyDown={handleKeyDown("product2")}
              onChange={(e) => setInputValue2(e.target.value)}
              onFocus={() => setIsFocused2(true)}
              onBlur={() => setIsFocused2(false)}
            />
          </div>
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

import React from "react";
import styles from "./compare.module.scss";

function ComparePage() {
  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <div>
          <div className={styles.text}>상품 1</div>
          <input
            type='text'
            className={styles.input}
          />
        </div>
        <div>
          <div className={styles.text}>상품 2</div>
          <input
            type='text'
            className={styles.input}
          />
        </div>
        <button
          type='button'
          className={styles.button}
        >
          비교하기
        </button>
      </div>
    </div>
  );
}

export default ComparePage;

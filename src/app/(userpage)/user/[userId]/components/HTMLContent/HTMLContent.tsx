import React from "react";
import styles from "./HTMLContent.module.scss";

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-explicit-any
const HTMLContent = ({ html }: any) => {
  // eslint-disable-next-line react/no-danger
  return (
    <div
      className={styles.container}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HTMLContent;
